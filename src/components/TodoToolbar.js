import React, { useContext, useMemo } from "react";
import { Button, ButtonGroup, Input, Row, Col } from "reactstrap";
import { TodoContext } from "../context/TodoContext";
import { CLEAR_COMPLETED } from "../context/action.types";

const TodoToolbar = () => {
  const { todos, dispatch, filter, setFilter, query, setQuery } = useContext(TodoContext);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => !!t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [todos]);

  return (
    <div className="toolbar">
      <Row className="g-2 align-items-center">
        <Col xs="12" md="6">
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ara (örn. market, toplantı...)"
            aria-label="Ara"
          />
        </Col>
        <Col xs="12" md="6" className="toolbar-right">
          <ButtonGroup className="toolbar-filters" aria-label="Filtre">
            <Button
              color={filter === "all" ? "primary" : "secondary"}
              outline={filter !== "all"}
              onClick={() => setFilter("all")}
            >
              Tümü ({stats.total})
            </Button>
            <Button
              color={filter === "active" ? "primary" : "secondary"}
              outline={filter !== "active"}
              onClick={() => setFilter("active")}
            >
              Aktif ({stats.active})
            </Button>
            <Button
              color={filter === "completed" ? "primary" : "secondary"}
              outline={filter !== "completed"}
              onClick={() => setFilter("completed")}
            >
              Tamamlanan ({stats.completed})
            </Button>
          </ButtonGroup>

          <Button
            className="toolbar-clear"
            color="danger"
            outline
            disabled={stats.completed === 0}
            onClick={() => dispatch({ type: CLEAR_COMPLETED })}
          >
            Tamamlananları temizle
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TodoToolbar;
