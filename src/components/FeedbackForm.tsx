import { generateClient } from "aws-amplify/api";
import { MouseEventHandler, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { type Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

export const FeeedbackForm = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ occupation, setOccupation ] = useState('');
  const [ comment, setComment ] = useState('');

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    const response = await client.mutations.sendFeedback({
      name,
      email,
      occupation,
      comment
    });
    console.log(response)

    if (!response.data?.id) {
      alert('Error sending feedback!');
      return;
    }

    alert('Feedback submitted!')
  }

  return (
    <div className="feedback-form-container">
      <Form>
        <FormGroup>
          <Label for="formEmail">Email</Label>
          <Input
            id="formEmail"
            name="formEmail"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="formName">Name</Label>
          <Input
            id="formName"
            name="formName"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="formOccupation">Occupation</Label>
          <Input
            id="formOccupation"
            name="formOccupation"
            placeholder="Occupation"
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
            placeholder="Feedback"
            type="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="formSubmit">Submit</Label>
          <button
            id="formSubmit"
            name="formSubmit"
            className="pretty-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </FormGroup>
      </Form>
    </div>
  )
}