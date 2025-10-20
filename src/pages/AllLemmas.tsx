import { Row, Col } from "reactstrap"
import { LemmaTable } from "../components/LemmaTable"

export const AllLemmas = () => {
  return (
    <div>
      <Row>
        <Col xs={12}>
          <h4>Lemma's op alfabet</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <LemmaTable />
        </Col>
      </Row>
    </div>
  )
}