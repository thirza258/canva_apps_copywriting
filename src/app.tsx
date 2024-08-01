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

  const onClickFirstStep = () => {
    setStep(2);
    setPrompt(input);
  };

  const onClickSecondStep = async () => {
    setLoading(true);
    let currentPrompt = `${input} ${theme} ${range}`;
    if (theme !== "") {
      currentPrompt = `${input} ${theme} ${range}`;
    }
    setPrompt(currentPrompt);

    try {
      const responses = await geminiService.doingPrompt(currentPrompt);
      console.log(responses);
      if (responses) {
        setResponse(responses);
        setResponseExample((prev: string[]) => [...prev, responses]);
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
            {responseExample.map((item, index) => (
              <div key={index}>
                <Text key={index}>{item}</Text>
                <Button variant="primary" onClick={() => implement(item)} stretch>
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
