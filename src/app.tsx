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
  const [prompt, setPrompt] = React.useState("");
  const [responseExample, setResponseExample] = React.useState<string[]>([]);
  const [error, setError] = React.useState("");

  const onClickFirstStep = () => {
    setStep(2);
    setPrompt(input);
  };

  const onClickSecondStep = async () => {
    setLoading(true);
    let currentPrompt = `Generate copywriting ${input} with range ${range} words`;
    if (theme !== "") {
      currentPrompt = `Generate copywriting ${input} with theme ${theme} with range ${range} words`;
    }
    setPrompt(currentPrompt);

    try {
      const responses = await geminiService.doingPrompt(currentPrompt);
      console.log(responses);
      if (responses) {
        if (responses === "error, please try again") {
          setError("error, please try again");
          return;
        } else {
          setError("");
          setResponse(responses);
          let response_example = parseOutput(responses);
          setResponseExample(response_example);
        }
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setStep(3);
      setLoading(false);
    }
  };

  const implement = (response: string) => {
    addNativeElement({
      type: "TEXT",
      children: [response],
    });
  };

  function parseOutput(output: string): string[] {
    if (/^\d+\./.test(output)) {
      return output.split("\n").map((line) => line.split(". ")[1].trim());
    } else if (/^\[.*\]$/.test(output)) {
      return output
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim());
    } else {
      return [output];
    }
  }

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
              value={input}
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
              value={theme}
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
            <Text>Here is your generated copywriting</Text>
            {error && <Text>{error}</Text>}
            {responseExample.map((item, index) => (
              <div key={index}>
                <Text key={index}>{item}</Text>
                <Button
                  variant="primary"
                  onClick={() => implement(item)}
                  stretch
                >
                  Implement
                </Button>
              </div>
            ))}
            <div className="kosong"></div>
            <Button variant="primary" onClick={() => setStep(1)} stretch>
              Restart
            </Button>
          </>
        )}
      </Rows>
    </div>
  );
};
