// eslint-disable-next-line import/no-anonymous-default-export
export default {
  control: {
    backgroundColor: "#fff",
    borderRadius: "6px",
    // boxShadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color),
    fontSize: 12,
    fontWeight: "normal",
    "&focused": {
      border: "transparent",
      boxShadow: "none",
      outline: "none",
    },
  },

  highlighter: {
    overflowY: "auto",
    overflowX: "hidden",
    "&focused": {
      border: "transparent",
      boxShadow: "none",
      outline: "none",
    },
  },

  input: {
    margin: 0,
    border: "transparent",

    "&focused": {
      border: "transparent",
      boxShadow: "none",
      outline: "none",
    },
    // padding: 0,
  },

  "&singleLine": {
    control: {
      display: "inline-block",
      border: "transparent",
      width: "100%",
      height: "100%",
      "&focused": {
        border: "transparent",
        boxShadow: "none",
        outline: "none",
      },
    },

    highlighter: {
      padding: 6,
      border: "2px inset transparent",
      "&focused": {
        border: "transparent",
        boxShadow: "none",
        outline: "none",
      },
    },

    input: {
      paddingBottom: 6,
      paddingRight: 0,
      paddingLeft: 0,

      "&focused": {
        border: "transparent",
        boxShadow: "none",
        outline: "none"
      },
    },
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace",

      border: "1px solid silver",
    },

    highlighter: {
      padding: 6,
    },

    input: {
      padding: 2,
      // minHeight: 63,
      outline: "none",
      border: "none",
      // maxHeight: 100,
      overflow: "auto",
      position: "absolute",
      // bottom: 14,
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 10,
    },

    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",

      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};
