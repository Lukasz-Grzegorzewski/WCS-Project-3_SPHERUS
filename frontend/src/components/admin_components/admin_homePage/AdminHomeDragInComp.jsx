import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HoverVideoPlayer from "react-hover-video-player";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class AdminHomeDragInComp extends Component {
  id2List = {
    droppable: "items",
    droppable2: "selected",
  };

  state = {
    items: [],
    selected: [],
    show: false,
  };

  constructor(props) {
    super(props);
    axios
      .get(
        `${import.meta.env.VITE_PORT_BACKEND}/videos/categories/${
          this.props.idCat
        }`
      )
      .then((res) => {
        this.setState({ items: res.data });
      })
      .catch((err) => console.error(err));
  }

  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
    console.log(this.state.selected);
  };

  updateDisplayCarousel = () => {
    this.state.selected.forEach((element) => {
      axios
        .patch(`${import.meta.env.VITE_PORT_BACKEND}/videos/${element.id}`, {
          carousel: 1,
        })
        .then(() => {
          this.props.getHome();
        })
        .catch((err) => console.error(err));
    });
  };

  render() {
    return (
      <div className="set">
        <div className="set_adminHomeDragInComp">
          {this.state.items.length >= 1 && (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div
                    className="set_adminHomeDragInComp_box"
                    ref={provided.innerRef}
                  >
                    {this.state.items.map((item, index) => (
                      <Draggable
                        key={JSON.stringify(item.id)}
                        draggableId={JSON.stringify(item.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="set_adminHomeDragInComp_box_div"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p className="set_adminHomeDragInComp_box_div_title">
                              {item.title}
                            </p>
                            <button
                              className="set_adminHomeDragInComp_box_div_btn"
                              type="button"
                              onClick={() => {
                                this.setState({ show: !this.state.show });
                              }}
                            >
                              Video sample
                            </button>
                            {this.state.show === true && (
                              <HoverVideoPlayer
                                videoClassName="set_adminHomeDragInComp_box_div_video"
                                className="set_adminHomeDragInComp_box_div_video"
                                videoSrc={
                                  `${import.meta.env.VITE_PORT_BACKEND}` +
                                  `${item.url}`
                                }
                                muted
                                playbackRangeStart={0}
                                playbackRangeEnd={6}
                              />
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="droppable2">
                {(provided) => (
                  <div
                    className="set_adminHomeDragInComp_box"
                    ref={provided.innerRef}
                  >
                    {this.state.selected.map((item, index) => (
                      <Draggable
                        key={JSON.stringify(item.id)}
                        draggableId={JSON.stringify(item.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="set_adminHomeDragInComp_box_div"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p className="set_adminHomeDragInComp_box_div_title">
                              {item.title}
                            </p>
                            <button
                              className="set_adminHomeDragInComp_box_div_btn"
                              type="button"
                              onClick={() => {
                                this.setState({ show: !this.state.show });
                              }}
                            >
                              Video sample
                            </button>
                            {this.state.show === true && (
                              <HoverVideoPlayer
                                videoClassName="set_adminHomeDragInComp_box_div_video"
                                className="set_adminHomeDragInComp_box_div_video"
                                videoSrc={
                                  `${import.meta.env.VITE_PORT_BACKEND}` +
                                  `${item.url}`
                                }
                                muted
                                playbackRangeStart={0}
                                playbackRangeEnd={6}
                              />
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
        <button
          className="adminHomeAddSection_form_btn"
          type="button"
          onClick={() => {
            this.props.addComp();
            this.updateDisplayCarousel();
          }}
        >
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                />
              </svg>
            </div>
          </div>
          <span>Add section</span>
        </button>
      </div>
    );
  }
}

export default AdminHomeDragInComp;

AdminHomeDragInComp.propTypes = {
  idCat: PropTypes.number.isRequired,
};
