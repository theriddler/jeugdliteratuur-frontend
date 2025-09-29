import { useQuery } from "@apollo/client"
import { INTRODUCTION } from "../queries"
import { Col, Row } from "reactstrap"

export const Homepage = () => {
  const { data } = useQuery(INTRODUCTION)
  console.log(data)

  return (
    <Row>
      <Col>
        <div>
          <h5>Homepage</h5>
          {data?.introduction?.Text}
        </div>
      </Col>
    </Row>
  )
}