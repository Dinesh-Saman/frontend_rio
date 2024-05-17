import React from "react";
import { useState, useEffect, useContext, useImperativeHandle, forwardRef } from "react";
import DiagramDictionaryContext from "../../context/DiagramDictionaryContext";

const Edit_items = forwardRef((props, ref) => {
    const [data, setData] = useState(props.data);
    const { setDiagramDictionary } = useContext(DiagramDictionaryContext); // Context

    useImperativeHandle(ref, () => ({
        addUsecase,
        addActor,
    }));

    // update dictionary on data change
    useEffect(() => {
        const newData = convertBack(data);
        setDiagramDictionary(newData);
    }, [data]);

    // convert dictionary back to server-supported dictionary
    const convertBack = (dictionary) => {
        const newDict = dictionary.reduce((acc, { actor, usecases }) => {
            acc[actor] = usecases;
            return acc;
        }, {});
        return newDict;
    };

    const handleActorEdit = (event, key) => {
        const newTest = [...props.data];
        newTest[key].actor = event.target.value;
        setData(newTest);
    };
    const handleUCEdit = (event, key, subkey) => {
        const newTest = [...props.data];
        newTest[key].usecases[subkey] = event.target.value;
        setData(newTest);
    };

    // move usecase to previous index
    const moveUp = (keyIndex, valueIndex) => {
        if (valueIndex !== 0) {
            const newData = [...data];
            // es6 destructuring assignment
            [newData[keyIndex].usecases[valueIndex], newData[keyIndex].usecases[valueIndex - 1]] = [
                newData[keyIndex].usecases[valueIndex - 1],
                newData[keyIndex].usecases[valueIndex],
            ];
            setData(newData);
        } else {
            const newData = [...data];
            // es6 destructuring assignment
            newData[keyIndex - 1].usecases.push(data[keyIndex].usecases[valueIndex]); // should push to top
            newData[keyIndex].usecases.splice(0, 1);
            setData(newData);
        }
    };

    // move usecase to next index
    const moveDown = (keyIndex, valueIndex) => {
        const usecasesLength = data[keyIndex].usecases.length;
        if (valueIndex < usecasesLength - 1) {
            const newData = [...data];
            // es6 destructuring assignment
            [newData[keyIndex].usecases[valueIndex], newData[keyIndex].usecases[valueIndex + 1]] = [
                newData[keyIndex].usecases[valueIndex + 1],
                newData[keyIndex].usecases[valueIndex],
            ];
            setData(newData);
        } else {
            const newData = [...data];
            newData[keyIndex + 1].usecases.unshift(data[keyIndex].usecases[valueIndex]); // should push to top
            newData[keyIndex].usecases.splice(valueIndex, 1); // remove last elemet from previous list
            setData(newData);
        }
    };

    // add actor to dictionary
    const addActor = () => {
        const newData = [...data];
        newData.push({ actor: "", usecases: [] });
        setData(newData);
    };

    // add usecase to dictionary
    const addUsecase = () => {
        const newData = [...data];
        newData[newData.length - 1].usecases.push("");
        setData(newData);
    };

    // remove actor from dictionary
    const removeActor = (key) => {
        const newData = [...data];
        newData.splice(key, 1);
        setData(newData);
    };

    // remove usecase from dictionary
    const removeUsecase = (key, subkey) => {
        const newData = [...data];
        newData[key].usecases.splice(subkey, 1);
        setData(newData);
    };

    return (
        <div className="overflow-auto" style={{ maxHeight: "60vh" }}>
            <div>
                {data.map((item, key) => (
                    <div className="my-3">
                        <div className="d-flex">
                            <input
                                type={"text"}
                                value={item.actor}
                                className="form-control border border-4 rounded mb-1 p-1"
                                style={{ width: "30%" }}
                                onChange={(event) => handleActorEdit(event, key)}
                            />

                            <button
                                type="button"
                                className="btn btn-danger px-2"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete Actor"
                                onClick={() => removeActor(key)}
                            >
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                        {item.usecases.map((subitem, subkey) => (
                            <div className="d-flex">
                                <input
                                    type={"text"}
                                    value={subitem}
                                    className="form-control border border-4 rounded ms-4 p-1"
                                    style={{ width: "60%" }}
                                    onChange={(event) => handleUCEdit(event, key, subkey)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary px-2 mx-1 my-2"
                                    style={{ backgroundColor: "#159895", borderColor: "#159895" }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Move Down Usecase"
                                    onClick={() => moveDown(key, subkey)}
                                >
                                    <i class="fa-solid fa-chevron-down"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary px-2 mx-1 my-2"
                                    style={{ backgroundColor: "#159895", borderColor: "#159895" }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Move Up Usecase"
                                    onClick={() => moveUp(key, subkey)}
                                >
                                    <i class="fa-solid fa-chevron-up"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger px-2 mx-1 my-2"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Delete Usecase"
                                    onClick={() => removeUsecase(key, subkey)}
                                >
                                    <i class="fa-regular fa-trash-can"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Edit_items;
