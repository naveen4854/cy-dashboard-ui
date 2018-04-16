
/**
 * Map threshold to server obj
 * @param {*} inputWidget 
 */
export function mapThresholdsToServer(inputWidget) {
    if (inputWidget.appliedSettings && inputWidget.appliedSettings.thresholds) {
      let thresholds = _.map(inputWidget.appliedSettings.thresholds, threshold => {
        return {
          thv: threshold.levelValue,
          thc: threshold.color, // TODO: Pass Color appropriately
          // SoundFilePath: threshold.soundFile, // TODO: Pass sound file appropriately
          thst: threshold.isContinuous ? 1 : 0, // TODO: Create an enum or have a boolean value for isContinuos
          thea: threshold.emailTo,
          thes: threshold.emailSubject,
          thmn: threshold.smsTo
        };
      });
      return thresholds;
    }
  }