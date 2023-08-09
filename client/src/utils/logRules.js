export const logRules = (error) => {
    if (error.dev?.error) {
        for (const rule of error.dev.error.errInfo.details.schemaRulesNotSatisfied) {
            console.log(rule);
        }
    }
}