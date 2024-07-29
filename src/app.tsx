import { Button, Rows, Text, TextInput, Title } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import * as React from "react";
import styles from "styles/components.css";


export const App = () => {
  const [input, setInput] = React.useState("");

  const onClick = () => {
    addNativeElement({
      type: "TEXT",
      children: ["Hello world!"],
    });
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Title 
        alignment="center"
        size="small"
        capitalization="default"
        >Generate with Gemini</Title>
        <TextInput
        type="text"
        name="input"
        disabled={false}
        onChange={(value: string) => setInput(value)}
        />
        <Text>{input}</Text>
        <Button variant="primary" onClick={onClick} stretch>
          Generate
        </Button>
      </Rows>
    </div>
  );
};
