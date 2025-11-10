export type TileType = "road" | "building";

export interface Tile {
    type: TileType;
}

export function generateMap(width = 20, height = 20): Tile[][] {
    const map: Tile[][] = [];

    for (let y = 0; y < height; y++) {
        const row: Tile[] = [];
        for (let x = 0; x < width; x++) {
            const isRoad = y % 4 === 0 || x % 4 === 0;
            const tile: Tile = {
                type: isRoad ? "road" : "building",
            };
            row.push(tile);
        }
        map.push(row);
    }

    return map;
}
