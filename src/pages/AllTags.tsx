import { Col, Row } from "reactstrap"
import { TagTable } from "../components/TagTable"

export const AllTags = () => {
  return (
    <div>
      <Row>
        <Col xs={12}>
          <h4>Alle tags</h4>
        </Col>
        <Col xs={12}>
          <TagTable />
        </Col>
      </Row>
    </div>
  )
}