import type { Tile } from "@/features/map/generator";

interface Node {
    x: number;
    y: number;
    g: number;
    h: number;
    f: number;
    parent?: Node;
}

function isWalkable(map: Tile[][], x: number, y: number) {
    return (
        y >= 0 &&
        y < map.length &&
        x >= 0 &&
        x < map[0].length &&
        map[y][x].type === "road"
    );
}

export function findPath(map: Tile[][], start: { x: number; y: number }, goal: { x: number; y: number }) {
    const open: Node[] = [];
    const closed = new Set<string>();

    const startNode: Node = {
        x: start.x,
        y: start.y,
        g: 0,
        h: Math.abs(goal.x - start.x) + Math.abs(goal.y - start.y),
        f: 0,
    };
    startNode.f = startNode.h;
    open.push(startNode);

    const dirs = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
    ];

    while (open.length > 0) {
        open.sort((a, b) => a.f - b.f);
        const current = open.shift()!;
        const key = `${current.x},${current.y}`;
        closed.add(key);

        if (current.x === goal.x && current.y === goal.y) {
            const path: { x: number; y: number }[] = [];
            let node: Node | undefined = current;
            while (node) {
                path.unshift({ x: node.x, y: node.y });
                node = node.parent;
            }
            return path;
        }

        for (const dir of dirs) {
            const nx = current.x + dir.x;
            const ny = current.y + dir.y;
            if (!isWalkable(map, nx, ny)) continue;
            const neighborKey = `${nx},${ny}`;
            if (closed.has(neighborKey)) continue;

            const g = current.g + 1;
            const h = Math.abs(goal.x - nx) + Math.abs(goal.y - ny);
            const existing = open.find((n) => n.x === nx && n.y === ny);

            if (!existing || g < existing.g) {
                const node: Node = { x: nx, y: ny, g, h, f: g + h, parent: current };
                if (!existing) open.push(node);
            }
        }
    }

    return [];
}
