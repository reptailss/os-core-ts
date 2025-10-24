import {DockBlockJson, DocModuleJson, DocPageJson, DocsJson} from '@docJson/types'
import {NavigateItem} from '@layouts/navigation/types'

export class NavigationBuilder {
    
    static getNavigationFromDocsJson(docsJson: DocsJson): NavigateItem[] {
        if (!docsJson?.modules?.length) {
            return []
        }
        const res: NavigateItem[] = []
        docsJson.modules.forEach((module) => {
            const navigateItem = this.getNavigationsFromModule(module)
            if (!navigateItem) {
                return
            }
            res.push(navigateItem)
        })
        
        return res
    }
    
    
    private static getNavigationsFromModule(module: DocModuleJson): NavigateItem | null {
        if (!module.pages.length) {
            return null
        }
        
        if (module.pages.length === 1) {
            return this.getNavigationFromPage(module.pages[0])
            
        }
        
        const children: NavigateItem[] = []
        
        module.pages.forEach(page => {
            children.push(this.getNavigationFromPage(page))
        })
        
        return {
            children,
            title: module.navTitle || module.title,
            path: null,
            anchor: null
        }
    }
    
    private static getNavigationFromPage(page: DocPageJson): NavigateItem {
        if (page.blocks.length === 1) {
            return this.getNavigationFromBlock(page.path, page.blocks[0])
        }
        return {
            path: page.path || '',
            title: page.navTitle || page.title,
            anchor: null,
            children: page.blocks?.length >= 1 ? page.blocks.map((block) => {
                return this.getNavigationFromBlock(page.path, block)
            }) : []
        }
    }
    
    private static getNavigationFromBlock(pagePath: string, block: DockBlockJson) {
        if (block.type === 'stepper' && block.steps.length) {
            return {
                path: pagePath,
                title: block.navTitle || block.title,
                anchor: block.anchor,
                children: block.steps.map((step) => {
                    return {
                        path: pagePath,
                        title: step.navTitle || step.title,
                        anchor: step.anchor
                    }
                }),
            }
        }
        return {
            path: pagePath,
            title: block.navTitle || block.title,
            anchor: block.anchor
        }
    }
}