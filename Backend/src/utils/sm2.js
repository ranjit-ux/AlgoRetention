export const calculateSM2 = (
    quality,
    repetition,
    interval,
    easinessFactor
) => {
    let newRepetition = repetition;
    let newInterval = interval;
    let newEF = easinessFactor;

    // Failed review

    if (quality < 3) {
        newRepetition = 0;
        newInterval = 1;
    } else {
        // Successful review

        if (newRepetition === 0) {
            newInterval = 3;
        } else if (newRepetition === 1) {
            newInterval = 8;
        } else {
            newInterval = Math.round(
                newInterval * newEF
            );
        }

        newRepetition += 1;
    }

    // Update Easiness Factor

    newEF =
        newEF +
        (
            0.1 -
            (5 - quality) *
                (
                    0.08 +
                    (5 - quality) * 0.02
                )
        );

    if (newEF < 1.3) {
        newEF = 1.3;
    }

    const nextRevisionDate =
        new Date();

    nextRevisionDate.setDate(
        nextRevisionDate.getDate() +
        newInterval
    );

    return {
        repetition: newRepetition,

        interval: newInterval,

        easinessFactor:
            Number(newEF.toFixed(2)),

        nextRevisionDate,
    };
};