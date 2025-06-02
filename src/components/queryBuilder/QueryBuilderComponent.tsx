import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  formatQuery,
  QueryBuilder,
  remove,
  RuleGroupType,
} from "react-querybuilder";
import { Grid, Typography, Box, Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "react-querybuilder/dist/query-builder.css";
import "./style.css";
import "./style.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import MultiLevelDropDown from "../MultiLevelDropDown/MultiLevelDropDown";
import { CustomValueEditor } from "./customValueEditor";
import { getFieldOperators } from "../../utils/queryBuilderConfig/GetOperators";

interface QueryBuilderComponentProps {
  fields: any;
  getOperators: any;
  isAdvanceSearch?: boolean;
  initialQuery: RuleGroupType;
  lastQuery: RuleGroupType;
  resetAdditionalFilter?: () => void;
}

const QueryBuilderComponent = forwardRef<
  {
    getFinalQuery: () => string;
    getQuery: () => RuleGroupType;
    resetQueryFunc: () => void;
  },
  QueryBuilderComponentProps
>((props, ref) => {
  const useStyles = makeStyles((theme: Theme) => ({
    resetButtonStyle: {
      backgroundColor: `${theme.palette.primaryColor.main}`,
      color: "#fff",
      "&:hover": {
        backgroundColor: `${theme.palette.primaryColor.main}`,
        color: "#FFF",
      },
    },
    buttonContainer: {
      position: "sticky",
      top: 0,
      zIndex: 100,
      backgroundColor: theme.palette.backTabs.main,
      display: "flex",
      justifyContent: "right",
    },
    resultContainer: {
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.secondary.light,
      paddingTop: "10px",
      textAlign: "center",
      color: theme.palette.text.primary,
    },
  }));
  const classes = useStyles();

  const {
    fields,
    getOperators,
    isAdvanceSearch,
    initialQuery,
    lastQuery,
    resetAdditionalFilter,
  } = props;
  const [query, setQuery] = useState(lastQuery);
  const [showButton, setShowButton] = useState(false);

  useImperativeHandle(ref, () => ({
    getFinalQuery,
    getQuery,
    resetQueryFunc,
  }));

  const getFinalQuery = () => {
    return formatQuery(query, { format: "sql", parseNumbers: true });
  };

  const getQuery = () => {
    return query;
  };

  const resetQueryFunc = () => {
    setQuery(initialQuery);
    if (resetAdditionalFilter) resetAdditionalFilter();
    setShowButton(false); // Hide the button after clicking it
  };

  const handleQueryChange = (q: RuleGroupType ) => {

    if (!showButton) setShowButton(true); // Show the button on the first change of the query
    setQuery(q);
  };

  const resetButtonAppear = () => {
    if (lastQuery.rules.length === 0 && initialQuery.rules.length === 0)
      setShowButton(false);
    else setShowButton(true);
  };

  useEffect(() => {
    resetButtonAppear();
  }, []);

  const CustomControlElements = (event: any) => {
    return (
      <DeleteIcon
        sx={{ color: "red", cursor: "pointer" }}
        onClick={() => removeItem(event)}
      />
    );
  };

  const [title, setTitle] = React.useState<any>({});

  const CustomSelect = (e: any) => {
    const handleItemClick = (field: any) => {
      setTitle({ ...title, [e?.rule?.id]: field });
      e.handleOnChange(field);
    };
    return (
      <MultiLevelDropDown
        fields={e.options}
        handleClick={handleItemClick}
        fieldTitle={e.value}
      />
    );
  };

  const removeItem = (event: any) => {
    let id = query.rules.findIndex(
      (item: any) => event.ruleOrGroup.id === item.id
    );
    setQuery(remove(query, [id]));
  };

  return (
    <Grid
      container
      direction="column"
      style={{ direction: "ltr", paddingTop: 0 }}
      spacing={0}
    >
      {showButton && !isAdvanceSearch && (
        <Grid
          item
          style={{ padding: "10px", paddingRight: 0 }}
          className={classes.buttonContainer}
        >
          <Button
            className={classes.resetButtonStyle}
            variant="contained"
            onClick={resetQueryFunc}
          >
            بازنشانی فیلتر
          </Button>
        </Grid>
      )}
      <Grid item style={{ paddingTop: "20px" }}>
        <QueryBuilder
          controlClassnames={{ queryBuilder: "queryBuilder-branches" }}
          fields={fields}
          query={query}
          getOperators={getOperators}
          onQueryChange={handleQueryChange}
          controlElements={{
            removeRuleAction: CustomControlElements,
            removeGroupAction: CustomControlElements,
            fieldSelector: CustomSelect,
            valueEditor: CustomValueEditor,
          }}
          // showCombinatorsBetweenRules
          // showNotToggle
          // controlElements={{
          //   fieldSelector: AutoCompleteCmp,
          // }}
        />
      </Grid>
      <Grid item className={classes.resultContainer}>
        <Box
          style={{
            padding: "14px",
            border: "1px dashed #444444",
            borderRadius: "10px",
          }}
        >
          <Typography style={{ fontSize: "12px", textAlign: "justify" }}>
            {getFinalQuery()}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
});

export default QueryBuilderComponent;
