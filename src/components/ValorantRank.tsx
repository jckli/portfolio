import Image from "next/image";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export async function ValorantRank(props: any) {
    const puuid = "32df10f8-f9c5-5d39-a9b2-f811357ae4b1";
    const data = await getValorantPlayerData(puuid);
    const ranks = await getValorantRanks();

    const currentPlayerRankData =
        ranks.data[ranks.data.length - 1].tiers[data.data.LatestCompetitiveUpdate.TierAfterUpdate];
    const rankedRatingEarned = data.data.LatestCompetitiveUpdate.RankedRatingEarned;

    return (
        <>
            <div
                className="h-full w-full flex flex-col items-center justify-center rounded-lg min-h-[13rem] text-white"
                style={{ backgroundColor: `#${currentPlayerRankData.backgroundColor.slice(0, -2)}` }}
            >
                <Image alt="Valorant Rank Icon" src={currentPlayerRankData.largeIcon} width={96} height={96} />
                <div className="mt-2 flex flex-col items-center justify-center">
                    <h1 className="text-lg leading-6">{currentPlayerRankData.tierName}</h1>
                    <div className="font-metropolis w-full flex flex-col justify-center items-center mt-1">
                        <p className="leading-5">{data.data.LatestCompetitiveUpdate.RankedRatingAfterUpdate}/100</p>
                        <p className="leading-4 text-sm">
                            last:{" "}
                            <span
                                className={
                                    rankedRatingEarned > 0
                                        ? "text-green-500"
                                        : rankedRatingEarned < 0
                                        ? "text-red-500"
                                        : "text-text-color"
                                }
                            >
                                {rankedRatingEarned > 0 ? `+${rankedRatingEarned}` : rankedRatingEarned}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

async function getValorantPlayerData(puuid: string) {
    const res = await fetch(`https://api.jackli.dev/valorant/mmr/players/${puuid}`);
    if (!res.ok) {
        throw new Error("Failed to fetch valorant player data");
    }

    return res.json();
}

async function getValorantRanks() {
    const res = await fetch(`https://valorant-api.com/v1/competitivetiers`);
    if (!res.ok) {
        throw new Error("Failed to fetch valorant rank data");
    }

    return res.json();
}