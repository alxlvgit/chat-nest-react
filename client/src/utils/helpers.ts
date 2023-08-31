// Get formatted date and time for messages
export const formattedDate = (createdAt: number) => {
  const isToday = new Date(createdAt).getDate() === new Date().getDate();
  let formattedDate = isToday
    ? `Today at: ${new Date(createdAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })}`
    : `${new Date(createdAt).toLocaleDateString()} at: ${new Date(
        createdAt
      ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })}`;
  return formattedDate;
};
