import React, { useState, useEffect } from "react";
import {
  getAllBirds,
  getAllPlants,
  getAllSeaAnimal,
  getAllSeaPlants,
} from "../../api/ecoSystemApi";
import "../css/EcoSystemPopup.css";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function EcoSystemPopup() {
  const quitEcoPopup = () => {
    const EcoPop = document.getElementById("EcoPopup");
    EcoPop.style.display = "none";
    if (badges.visitBiology === false) {
      MySwal.fire({
        title: <h3>뱃지 획득!</h3>,
        icon: "info",
        html: <p>생태관 방문 뱃지 획득!</p>,
      });
    }
    setIsSelected(false);
    setDetailSelected(false);
    setData([]);
    setSelectedData([]);
    setCategory("");
  };
  const [badges, setBadges] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [detailSelected, setDetailSelected] = useState(false);
  const [data, setData] = useState([]);
  const accessToken = sessionStorage.getItem("accessToken");

  const MySwal = withReactContent(Swal);
  useEffect(() => {
    const getBadges = async () => {
      await axios
        .get(`https://k7d204.p.ssafy.io/api/badge`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setBadges(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBadges();
  }, [category]);
  useEffect(() => {
    if (category === "bird") {
      getAllBirds()
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (category === "plant") {
      getAllPlants()
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (category === "seaAnimal") {
      getAllSeaAnimal()
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (category === "seaPlant") {
      getAllSeaPlants()
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setData([]);
    }
  }, [category]);
  const ShowDetail = () => {
    return (
      <div className='EcoSystemListWrapper'>
        <div className='EcoSystemBackBtn'>
          <button
            onClick={() => {
              setSelectedData("");
              setDetailSelected(false);
              if (!detailSelected) {
                setCategory("");
              }
            }}
          >
            Back
          </button>
        </div>

        <div className='EcoSystemDetailInfo'>
          <div className='EcoSystemDetailImage'>
            <img
              src={
                "https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/" +
                selectedData.img
              }
              alt='NO '
            />
          </div>
          <div className='EcoSystemDetailName'>{selectedData.name}</div>

          <div className='EcoSystemDetailSummary'>{selectedData.summary}</div>
        </div>
      </div>
    );
  };

  const ShowList = () => {
    if (!detailSelected) {
      return (
        <div className='EcoSystemListWrapper'>
          <div className='EcoSystemBackBtn'>
            <button
              onClick={() => {
                setIsSelected(false);
                setCategory("");
                setSelectedData("");
                setDetailSelected(false);
              }}
            >
              Back
            </button>
          </div>
          <div className='EcoSystemDataList'>
            {data.map((data) => {
              if (data === undefined) {
                return <></>;
              }
              return (
                <div
                  key={data.name}
                  className='EcoSystemListData'
                  onClick={() => {
                    setSelectedData(data);
                    setDetailSelected(true);
                  }}
                >
                  <div className='EcoSystemListImage'>
                    <img
                      src={
                        "https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/" +
                        data?.img
                      }
                      alt='NO'
                    />
                  </div>
                  <div className='EcoSystemListName'>{data.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <ShowDetail />;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className='EcosystemContainer'>
        <div className='EcosystemTitle'>독도의 생태계</div>
        <div style={{ margin: "15px 0" }}>
          버튼을 누르시면 해당 카테고리에 해당하는 동식물들을 만나보실 수
          있습니다{" "}
        </div>
        <img
          src='/assets/icons/cancel.png'
          id='quitButton'
          onClick={quitEcoPopup}
          className='quitPopup'
          alt='NOQUITIMAGE'
        ></img>
        {isSelected ? (
          <ShowList />
        ) : (
          <div className='EcosystemSelectBtnWrapper'>
            <div
              className='EcosystemSelectBtn'
              onClick={() => {
                setIsSelected(true);
                setCategory("plant");
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/plant_Icon.png"}
                alt=''
              />
              <div>식물</div>
            </div>
            <div
              className='EcosystemSelectBtn'
              onClick={() => {
                setIsSelected(true);
                setCategory("seaAnimal");
              }}
            >
              {" "}
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/icons/seaAnimal_Icon.png"
                }
                alt=''
              />
              <div>해양동물</div>
            </div>
            <div
              className='EcosystemSelectBtn'
              onClick={() => {
                setIsSelected(true);
                setCategory("bird");
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/bird_Icon.png"}
                alt=''
              />
              <div>조류</div>
            </div>
            <div
              className='EcosystemSelectBtn'
              onClick={() => {
                setIsSelected(true);
                setCategory("seaPlant");
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/seaPlant_Icon.png"}
                alt=''
              />
              <div>해조류</div>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          position: "absolute",
          opacity: "30%",
          zIndex: "9",
        }}
      ></div>
    </div>
  );
}
export default EcoSystemPopup;
