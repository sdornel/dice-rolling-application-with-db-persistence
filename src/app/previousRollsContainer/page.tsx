import { useEffect, useState } from "react";

export const PreviousRollContainer = (props: { fetchData: () => Promise<{ previousRolls: Array<Roll> }>; }) => {
    const [previousRolls, setPreviousRolls] = useState<Array<Roll>>([]);

    useEffect((): void => {
        const fetchData = async () => {
            const fetchObject = await props.fetchData()
            setPreviousRolls(fetchObject.previousRolls);
        }
        fetchData();
    });

    return (
        <div>
            <h3>Previous ten rolls:</h3>
            {previousRolls.length > 0 ? (
            <ol>
            {previousRolls.map((r: Roll) => {
                return (
                <li key={r.id}>
                    {r.number}
                </li>
                )
            })}
            </ol>
            ) : (
            <span>No previous rolls found</span>
            )}
        </div>
    );
}