import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Theory.scss";
import prev from "../../assets/images/video_arr-prev.svg";
import next from "../../assets/images/video_arr-next.svg";
import check from "../../assets/images/video_checked.svg";
import catBottomPic from "../../assets/images/background_cat-theory.svg";
import { useSelector, useDispatch } from "react-redux";
import { updateProgress, updateGradeProgress } from "../../app/store/slice/UserAuthSlice";

function TheoryPagination() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(state => state.theoryFirst.theoryFirst);
  const { id } = useParams();
  const currentTheoryItem = parseInt(id, 10);
  const { pathname } = useLocation();
  const [gradeName, blockName] = pathname.split("/").slice(1);
  const progressItem = useSelector(state => {
    const grade = state.userAuth.progress.find(grade => grade.gradeName === gradeName);
    return grade?.blocks?.find(block => block.blockName === blockName)?.lastItem || 0;
  });
  const [checkedTheoryItem, setCheckedTheoryItem] = useState(false);

  useEffect(() => {
    setCheckedTheoryItem(false);
  }, [id]);

  const handleCheck = () => {
    setCheckedTheoryItem(true);
    const blockProgress = Number(
      parseFloat((currentTheoryItem / data.length) * 100).toFixed(2),
    );
    if (currentTheoryItem > progressItem) {
      dispatch(
        updateProgress({
          gradeName,
          blockName,
          lastItem: currentTheoryItem,
          blockProgress,
        }),
      );
      dispatch(updateGradeProgress({ gradeName }));
    }
  };

  const handlePrev = () => {
    if (currentTheoryItem > 1) {
      navigate(`/gradingfirst/theoryfirst/${currentTheoryItem - 1}`);
    }
  };

  const handleNext = () => {
    if (currentTheoryItem < data.length) {
      navigate(`/gradingfirst/theoryfirst/${currentTheoryItem + 1}`);
    }
  };

  const checkBtn = (
    <button className="theory__button" onClick={handleCheck}>
      <img src={check} alt="theory-checked" />
      <p>Я прочла</p>
    </button>
  );

  const nextBtn = (
    <button
      className={`theory__button ${currentTheoryItem === data.length ? "disabled" : ""}`}
      disabled={currentTheoryItem === data.length}
      onClick={handleNext}
    >
      <img src={next} alt="theory-next" />
      <p>Следующая тема</p>
    </button>
  );

  const prevBtn = (
    <button
      className={`theory__button ${currentTheoryItem === 1 ? "disabled" : ""}`}
      onClick={handlePrev}
      disabled={currentTheoryItem === 1}
    >
      <img src={prev} alt="theory-prev" />
      <p>Предыдущая тема</p>
    </button>
  );

  const catImg = (
    <div className="theory__cat">
      <img className="bg-image__cat" src={catBottomPic} alt="theory_cat" />
    </div>
  );

  return (
    <div className="theory__nav">
      {prevBtn}
      {catImg}
      {checkedTheoryItem ? nextBtn : checkBtn}
    </div>
  );
}

export default TheoryPagination;
