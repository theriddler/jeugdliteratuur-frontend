import { IconSort09, IconSortAZ } from "@tabler/icons-react"
import { useState } from "react"
import { Button, Col, Row } from "reactstrap"
import { LemmaTable } from "../components/LemmaTable"
import { LemmaSortType } from "../types"

export const AllLemmas = () => {
  const [ sortType, setSortType ] = useState(LemmaSortType.BY_NAME);

  return (
    <div>
      <Row>
        <Col xs={12}>
          <div className="d-flex align-items-center gap-4">
            <h4 className="m-0">Alle lemma's</h4>
            <Button
              size="sm"
              outline={sortType !== LemmaSortType.BY_NAME}
              onClick={() => setSortType(LemmaSortType.BY_NAME)}
            >
              <IconSortAZ />
              <span className="ms-2">Op alfabet</span>
            </Button>
            <Button
              size="sm"
              outline={sortType !== LemmaSortType.BY_GROUP}
              onClick={() => setSortType(LemmaSortType.BY_GROUP)}
            >
              <IconSort09 />
              <span className="ms-2">Op groep</span>
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <LemmaTable sortType={sortType} />
        </Col>
      </Row>
    </div>
  )
}