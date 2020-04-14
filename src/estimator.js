const covid19ImpactEstimator = (data) => {
  const input = data;
  // console.log(input);
  const {
    region: {
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    // population,
    totalHospitalBeds
  } = input;

  // Test Challenge 1
  const currentlyInfectedNormal = reportedCases * 100;
  const currentlyInfectedSevere = reportedCases * 500;

  const checkRequestedTime = () => {
    let daysValue;
    if (periodType === 'weeks') {
      daysValue = timeToElapse * 7;
    } else if (periodType === 'months') {
      daysValue = timeToElapse * 30;
    } else {
      daysValue = timeToElapse;
    }
    return daysValue;
  };

  const getInfectionsByRequestedTime = (currentlyInfected) => {
    const days = checkRequestedTime();
    const x = currentlyInfected * (
      2 ** (Math.trunc(days / 3)));
    return x;
  };

  const infectionsByRTN = getInfectionsByRequestedTime(currentlyInfectedNormal);
  const infectionsByRTS = getInfectionsByRequestedTime(currentlyInfectedSevere);

  // Test Challenge 2
  const getSevereCaseByRequestedTime = (infectionsByRT) => {
    const x = Math.trunc(infectionsByRT * 0.15);
    return x;
  };

  const severeCaseByRTN = getSevereCaseByRequestedTime(infectionsByRTN);
  const severeCaseByRTS = getSevereCaseByRequestedTime(infectionsByRTS);

  // getting the number of beds
  const getHospitalBedsByRequestedTime = (severeCaseByRT) => {
    const x = (totalHospitalBeds * (35 / 100));
    const y = Math.trunc(x - severeCaseByRT);
    return y;
  };

  // Test Challenge 3
  // Estimating casesForICUByRequestedTime
  const getCasesForICUByRequestedTime = (infectionsByRT) => {
    const x = Math.trunc(infectionsByRT * 0.05);
    return x;
  };

  // Estimating casesForVentilatorsByRequestedTime
  const getCasesForVentilatorsByRequestedTime = (infectionsByRT) => {
    const x = Math.trunc(infectionsByRT * 0.02);
    return x;
  };

  // Getting dollarsInFlight
  const getDollarsInFlight = (infectionsByRT) => {
    const x = infectionsByRT * avgDailyIncomePopulation * avgDailyIncomeInUSD;
    const y = Math.trunc(x / checkRequestedTime());
    return y;
  };

  const responseData = {
    data: input,
    impact: {
      currentlyInfected: currentlyInfectedNormal,
      infectionsByRequestedTime: infectionsByRTN,
      severeCasesByRequestedTime: severeCaseByRTN,
      hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime(severeCaseByRTN),
      casesForICUByRequestedTime: getCasesForICUByRequestedTime(infectionsByRTN),
      casesForVentilatorsByRequestedTime: getCasesForVentilatorsByRequestedTime(infectionsByRTN),
      dollarsInFlight: getDollarsInFlight(infectionsByRTN)
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere,
      infectionsByRequestedTime: infectionsByRTS,
      severeCasesByRequestedTime: severeCaseByRTS,
      hospitalBedsByRequestedTime: getHospitalBedsByRequestedTime(severeCaseByRTS),
      casesForICUByRequestedTime: getCasesForICUByRequestedTime(infectionsByRTS),
      casesForVentilatorsByRequestedTime: getCasesForVentilatorsByRequestedTime(infectionsByRTS),
      dollarsInFlight: getDollarsInFlight(infectionsByRTS)
    }
  };

  console.log(responseData);
  return responseData;
};

export default covid19ImpactEstimator;