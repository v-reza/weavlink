import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";

import { Button, Icon, Toolbar } from "./components";
import { useContext } from "react";
import { ThemeContext } from "../../../../../../Theme/ThemeContext";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const SlateTextEditor = () => {
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { theme } = useContext(ThemeContext);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <div className="w-full border-2 border-slate-500 rounded-md">
        <Toolbar>
          <MarkButton
            format="bold"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  className={`${
                    theme === "dark"
                      ? "darkButton__format-icon"
                      : "lightButton__format-icon"
                  }`}
                  fill="gray"
                  d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
                />
              </svg>
            }
          />
          <MarkButton
            format="italic"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  className={`${
                    theme === "dark"
                      ? "darkButton__format-icon"
                      : "lightButton__format-icon"
                  }`}
                  d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"
                />
              </svg>
            }
          />
          <MarkButton
            format="underline"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  className={`${
                    theme === "dark"
                      ? "darkButton__format-icon"
                      : "lightButton__format-icon"
                  }`}
                  d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"
                />
              </svg>
            }
          />
          <BlockButton
            format="numbered-list"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  className={`${
                    theme === "dark"
                      ? "darkButton__format-icon"
                      : "lightButton__format-icon"
                  }`}
                  d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"
                />
              </svg>
            }
          />
          <BlockButton
            format="bulleted-list"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" color="white" />
                <path
                  className={`${
                    theme === "dark"
                      ? "darkButton__format-icon"
                      : "lightButton__format-icon"
                  }`}
                  d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
                />
              </svg>
            }
          />
        </Toolbar>
        <Editable
          className="dark:text-white rounded-md px-4 py-10"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </div>
    </Slate>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return (
        <ul className="ml-2 list-disc dark:text-white" {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return (
        <ol className="ml-2 list-decimal dark:text-white" {...attributes}>
          {children}
        </ol>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "Tips: Provide a summary of the role, what success in the position looks like, and how this role fits into the organization overall. ",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Responsibilities",
        bold: true,
      },
      // { text: "bold", bold: true },
      // {
      //   text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      // },
    ],
  },
  {
    type: "paragpraph",
    children: [
      {
        text: "[Be specific when describing each of the responsibilities. Use gender-neutral, inclusive language.]",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Example: Determine and develop user requirements for systems in production, to ensure maximum usability",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
  {
    type: "Qualifications",
    children: [
      {
        text: "Responsibilities",
        bold: true,
      },
    ],
  },
  {
    type: "paragpraph",
    children: [
      {
        text: "[Some qualifications you may want to include are Skills, Education, Experience, or Certifications.]",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Example: Excellent verbal and written communication skills",
      },
    ],
  },
];

export default SlateTextEditor;
