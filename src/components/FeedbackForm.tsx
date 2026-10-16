import { generateClient } from "aws-amplify/api";
import { MouseEventHandler, useState } from "react";
import { Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { type Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

export const FeeedbackForm = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const [ hasFailed, setHasFailed ] = useState(false);
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ occupation, setOccupation ] = useState('');
  const [ comment, setComment ] = useState('');

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setHasFailed(false);
    try {
      const response = await client.mutations.sendFeedback({
        name,
        email,
        occupation,
        comment
      });

      if (response.data?.id) {
        setIsSubmitted(true);
      } else {
        setHasFailed(true);
      }
    } catch {
      setHasFailed(true);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="feedback-form-container">
        <p className="mb-0">Feedback verzonden</p>
      </div>
    );
  }

  return (
    <div className="feedback-form-container">
      <div>
        <h5>
          Feedback voor de pilot?
        </h5>
        <h5>
          Geef het hier door.
        </h5>
      </div>
      <hr />
      <Form>
        <FormGroup>
          <Label for="formName">Naam</Label>
          <Input
            id="formName"
            name="formName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="formEmail">Email</Label>
          <Input
            id="formEmail"
            name="formEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="formOccupation">Functie</Label>
          <Input
            id="formOccupation"
            name="formOccupation"
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="formComment">Feedback</Label>
          <Input
            id="formComment"
            name="formComment"
            type="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormGroup>
        {isLoading
          ? (
            <div className="d-flex w-100 justify-content-center">
              <Spinner />
            </div>
          )
          : (
            <FormGroup>
              <button
                id="formSubmit"
                name="formSubmit"
                className="pretty-button"
                onClick={handleSubmit}
              >
                Verzenden
              </button>
            </FormGroup>
          )
        }
        {hasFailed && (
          <p className="text-danger mt-3 mb-0">Feedback verzenden mislukt</p>
        )}
      </Form>
    </div>
  )
}