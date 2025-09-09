import * as React from "react";
import {useMemo} from "react";
import {unstable_useTreeItem2 as useTreeItem2, UseTreeItem2Parameters} from "@mui/x-tree-view/useTreeItem2";
import {TreeItem2Provider} from "@mui/x-tree-view/TreeItem2Provider";
import {TreeItem2Content, TreeItem2IconContainer, TreeItem2Label, TreeItem2Root} from "@mui/x-tree-view/TreeItem2";
import clsx from "clsx";
import {TreeItem2Icon} from "@mui/x-tree-view/TreeItem2Icon";
import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {TransitionProps} from "@mui/material/transitions";
import {animated, useSpring} from "@react-spring/web";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import {SetStateFn} from "@baseTypes/state";
import {Checkbox} from "@mui/material";

type Color = 'blue' | 'green';

interface LabelItem {
    fullPath: string,
    children: LabelItem[]
}

interface CustomLabelProps {
    children: React.ReactNode;
    color?: Color;
    expandable?: boolean;
    targetIds: string[],
    setTargetIds: SetStateFn<string[]>,
    onChangeEndpoints?: () => void
    id: string,
    item: LabelItem
}


function DotIcon({color}: { color: string }) {
    return (
        <Box sx={{marginRight: 1, display: 'flex', alignItems: 'center'}}>
            <svg width={6} height={6}>
                <circle cx={3} cy={3} r={3} fill={color}/>
            </svg>
        </Box>
    );
}

const checkTarget = (labelItem: LabelItem, targetIds: string[]) => {
    if (!labelItem.children.length) {
        return targetIds.includes(labelItem.fullPath)
    }
    return labelItem.children.every((child) => {
        return checkTarget(child, targetIds)
    })
}

const getAllChildIds = (labelItem: LabelItem): string[] => {
    const res: string[] = []
    if (!labelItem.children.length) {
        return [...res, labelItem.fullPath]
    }
    if (labelItem.children.length >= 1) {
        labelItem.children.forEach((child) => {
            const childRes = getAllChildIds(child)
            if (childRes.length >= 1) {
                res.push(...childRes)
            }
        })
    }
    return res;
}

function CustomLabel({
                         color,
                         expandable,
                         children,
                         targetIds,
                         setTargetIds,
                         item,
                         id,
                         onChangeEndpoints,
                         ...other
                     }: CustomLabelProps) {
    const theme = useTheme();
    const colors = {
        blue: theme.palette.primary.main,
        green: theme.palette.success.main,
    };

    const iconColor = color ? colors[color] : null;


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        const allIds = getAllChildIds(item)
        if (checked) {
            setTargetIds((prev) => {
                return [...new Set([...prev, ...allIds])]
            })
            if (onChangeEndpoints) {
                onChangeEndpoints()
            }
            return
        }
        setTargetIds((prev) => {
            return prev.filter((id) => !allIds.includes(id))
        })
        if (onChangeEndpoints) {
            onChangeEndpoints()
        }

    };

    const checked = useMemo(() => {
        return checkTarget(item, targetIds)
    }, [id, targetIds])
    return (
        <TreeItem2Label
            {...other}
            sx={{display: 'flex', alignItems: 'center'}}
            onClick={(e) => e.stopPropagation()}
        >
            {iconColor && <DotIcon color={iconColor}/>}
            <Typography
                className="labelText"
                variant="body2"
                sx={{color: 'text.primary'}}
            >
                {children}
            </Typography>

            <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{'aria-label': 'controlled'}}
            />
        </TreeItem2Label>
    );
}

interface CustomTreeItemProps extends Omit<UseTreeItem2Parameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
    targetIds: string[],
    setTargetIds: SetStateFn<string[]>,
    onChangeEndpoints?: () => void
}


const AnimatedCollapse = animated(Collapse);


function TransitionComponent(props: TransitionProps) {
    const style = useSpring({
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
        },
    });

    return <AnimatedCollapse style={style} {...props} />;
}


const EndpointTreeItem = React.forwardRef(function EndpointTree(
    {targetIds, setTargetIds, onChangeEndpoints, ...props}: CustomTreeItemProps,
    ref: React.Ref<HTMLLIElement>,
) {
    const {id, itemId, label, disabled, children, ...other} = props;

    const {
        getRootProps,
        getContentProps,
        getIconContainerProps,
        getLabelProps,
        getGroupTransitionProps,
        status,
        publicAPI,
    } = useTreeItem2({id, itemId, children, label, disabled, rootRef: ref});

    const item = publicAPI.getItem(itemId);
    const color = item?.color;
    return (
        <TreeItem2Provider itemId={itemId}>
            <TreeItem2Root {...getRootProps(other)}>
                <TreeItem2Content
                    {...getContentProps({
                        className: clsx('content', {
                            expanded: status.expanded,
                            selected: status.selected,
                            focused: status.focused,
                            disabled: status.disabled,
                        }),
                    })}
                >
                    {status.expandable && (
                        <TreeItem2IconContainer {...getIconContainerProps()}>
                            <TreeItem2Icon status={status}/>
                        </TreeItem2IconContainer>
                    )}

                    <CustomLabel
                        {...getLabelProps({color})}
                        targetIds={targetIds}
                        setTargetIds={setTargetIds}
                        onChangeEndpoints={onChangeEndpoints}
                        id={itemId}
                        item={item}
                    />
                </TreeItem2Content>
                {children && (
                    <TransitionComponent
                        {...getGroupTransitionProps({className: 'groupTransition'})}
                    />
                )}
            </TreeItem2Root>
        </TreeItem2Provider>
    );
});

export default EndpointTreeItem
