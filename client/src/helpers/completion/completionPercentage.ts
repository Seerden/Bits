/*

    - Each habit has a completionFrequency and completionTimescale property
    - Given a list of completion entries for that habit, 
        it's straightforward to compute various completion statistics
            - percentage of 'partitions' successully completed
            - current streak
            - best streak


*/

import { Timestep } from "types/time";
import { Completion } from "../../../../shared/types/Completion";

function percentageCompleted(
	completionFrequency: number,
	completionTimescale: Timestep,
	completionData: Completion[]
) {
    
};
