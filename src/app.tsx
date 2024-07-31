import {
  Button,
  Rows,
  Text,
  TextInput,
  Title,
  MultilineInput,
  ProgressBar,
  NumberInput,
} from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import * as React from "react";
import styles from "styles/components.css";
import geminiService from "./gemini/geminiService";
import { time } from "console";

export const App = () => {
  const [input, setInput] = React.useState("");
  const [response, setResponse] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [range, setRange] = React.useState(5);
  const [theme, setTheme] = React.useState("");

  const response_example = [
    "A beautiful sunset over the city skyline",
    "A beautiful sunset over the city",
    "A beautiful sunset",
  ]

  const onClickFirstStep = () => {
    setStep(2);
  };

  const onClickSecondStep = async () => {
    setLoading(true);

    // Show progress bar for 5 seconds
    setTimeout(async () => {
      addNativeElement({
        type: "TEXT",
        children: ["Hello world!"],
      });
      // Simulate API call
      const responses = await geminiService.doingPrompt();
      setResponse(responses);
      setStep(3);
    }, 5000);
    setLoading(false);
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        {loading && <ProgressBar value={50} size="medium" />}
        <Title alignment="center" size="small" capitalization="default">
          Generate with Gemini
        </Title>
        <Text>Gemini-enhanced copywriting generation tool.</Text>

        {step === 1 && (
          <>
            <MultilineInput
              autoGrow={true}
              id="input"
              disabled={false}
              onChange={(value: string) => setInput(value)}
              placeholder="Write here"
            />
            <Button variant="primary" onClick={onClickFirstStep} stretch>
              Generate
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <Text>Can you give me more Context</Text>
            <TextInput
              name="input"
              value={input}
              onChange={(value: string) => setTheme(value)}
              placeholder="theme"
            />
            <NumberInput
              defaultValue={5}
              id="range"
              onChange={(value: number) => setRange(value)}
              hasSpinButtons
              incrementAriaLabel="Increment example number"
              decrementAriaLabel="Decrement example number"
              step={1}
              max={100}
              min={5}
            />
            <Button variant="primary" onClick={onClickSecondStep} stretch>
              Continue
            </Button>
            <Button variant="secondary" onClick={() => setStep(1)} stretch>
              Back
              </Button>
          </>
        )}
        {step === 3 && (
          <>
            {response_example.map((item, index) => (
              <div key={index}>
              <Text key={index}>{item}</Text>
              <Button variant="primary" stretch>Implement</Button>
              </div>
            ))}
            <Button variant="primary" onClick={() => setStep(1)} stretch>
              Restart
            </Button>
          </>
        )}
      </Rows>
    </div>
  );
};


