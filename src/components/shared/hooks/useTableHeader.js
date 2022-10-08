export const useTableHeader = (props) => {
  const { headings, defaultMinWidth = "150", defaultMaxWidth = "300" } = props;

  const camelCaseConverter = (normalWord) => {
    return normalWord
      .trim()
      .toLowerCase()
      .replace(/([^A-Z0-9]+)(.)/gi, function(match) {
        return arguments[2].toUpperCase();
      });
  };

  let column = [];
  headings.forEach((item, index) => {
    column.push({
      id: camelCaseConverter(item.name),
      label: item.name,
      minWidth: item.width ? item.width : defaultMinWidth,
      maxWidth: defaultMaxWidth,
      disablePadding: true,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    });
  });

  return column;
};
