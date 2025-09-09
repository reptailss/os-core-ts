import { EndpointNode } from "../types/endpoint";

export const getTreeEndpoints = (routes: string[]):EndpointNode[]=>{
    const root: EndpointNode[] = [];

    for (const route of routes) {
        const parts = route.split('/').filter((part) => part && !part.startsWith(':'));
        let currentLevel = root;
        let fullPath = '';

        for (const part of parts) {
            fullPath += `/${part}`;
            let node = currentLevel.find((n) => n.name === part);

            if (!node) {
                node = { name: part, children: [], fullPath };
                currentLevel.push(node);
            }

            currentLevel = node.children;
        }
    }

    return root;
}
