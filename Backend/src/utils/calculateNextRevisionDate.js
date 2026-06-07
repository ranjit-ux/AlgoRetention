export const calculateNextRevisionDate = (
    difficulty,
    currentDate = new Date()
) => {

    const nextDate = new Date(currentDate);

    switch (difficulty) {
        case "Easy":
            nextDate.setDate(
                nextDate.getDate() + 15
            );
            break;

        case "Medium":
            nextDate.setDate(
                nextDate.getDate() + 7
            );
            break;

        case "Hard":
            nextDate.setDate(
                nextDate.getDate() + 3
            );
            break;

        default:
            nextDate.setDate(
                nextDate.getDate() + 7
            );
    }

    return nextDate;
};