const CalculateReward = (records) => {
  let totalRewards = 0;
  const recordsWithRewards = [...records];
  recordsWithRewards.forEach((record) => {
    const reward = getReward(Math.floor(record.cost));
    record.reward = reward;
    totalRewards += reward;
  });
  return { totalRewards, recordsWithRewards };
};

const getReward = (cost) => {
  if (cost < 50) return 0;
  else if (cost < 100) return cost - 50;
  else return (cost - 100) * 2 + 50;
};

export default CalculateReward;
