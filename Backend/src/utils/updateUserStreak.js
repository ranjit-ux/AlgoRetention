import User from "../models/User.js";
import RevisionRecord from "../models/RevisionRecord.js";

export const updateUserStreak = async (
    userId
) => {
    const revisionDays =
        await RevisionRecord.aggregate([
            {
                $match: {
                    user: userId,
                },
            },

            {
                $group: {
                    _id: {
                        $dateToString: {
                            format:
                                "%Y-%m-%d",
                            date:
                                "$revisionDate",
                        },
                    },
                },
            },

            {
                $sort: {
                    _id: -1,
                },
            },
        ]);

    if (
        revisionDays.length === 0
    ) {
        return;
    }

    let streak = 1;

    let previousDate =
        new Date(
            revisionDays[0]._id
        );

    for (
        let i = 1;
        i < revisionDays.length;
        i++
    ) {
        const currentDate =
            new Date(
                revisionDays[i]._id
            );

        const diffDays =
            Math.round(
                (
                    previousDate -
                    currentDate
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );

        if (diffDays === 1) {
            streak++;
            previousDate =
                currentDate;
        } else {
            break;
        }
    }

    const user =
        await User.findById(userId);

    user.currentStreak =
        streak;

    user.bestStreak =
        Math.max(
            user.bestStreak,
            streak
        );

    await user.save();
};