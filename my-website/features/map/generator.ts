// define the exact valid tile types
export type TileType = "road" | "building" | "park" | "alley";

// define the shape of a tile
export interface Tile {
    type: TileType;
}

// strongly type your generator
export function generateMap(width = 0, height = 0): Tile[][] {
    const map: Tile[][] = [];

    for (let y = 0; y < height; y++) {
        const row: Tile[] = [];
        for (let x = 0; x < width; x++) {
            const rand = Math.random();
            const isRoad =
                y % 4 === 0 ||
                x % 4 === 0 ||
                (rand < 0.05 && y % 3 === 0) ||
                (rand < 0.05 && x % 3 === 0);

            let type: TileType;

            if (isRoad) type = "road";
            else if (rand < 0.05) type = "park";
            else if (rand < 0.1) type = "alley";
            else type = "building";

            row.push({ type });
        }
        map.push(row);
    }

    return map;
}
