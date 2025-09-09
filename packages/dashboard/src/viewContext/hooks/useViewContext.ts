import React from 'react'
import {ViewContext} from "@viewContext/ViewContextProvider";
import {IViewContext} from "@viewContext/types";


export const useViewContext = () => React.useContext<IViewContext>(ViewContext as any)