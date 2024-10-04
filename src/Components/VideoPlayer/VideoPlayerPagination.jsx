import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./VideoPlayer.scss";
import prev from "../../assets/images/video_arr-prev.svg";
import next from "../../assets/images/video_arr-next.svg";
import check from "../../assets/images/video_checked.svg";
import catBottomPic from "../../assets/images/background_cat-video.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateProgress, updateGradeProgress } from "../../app/store/slice/UserAuthSlice";

function VideoPlayerPagination({ isEnded, pagePath, gradingPath }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasWatched, setHasWatched] = useState(false);
  const data = useSelector(state => state.videos.videos);
  const { id } = useParams();
  const currentVideo = parseInt(id, 10);
  const { pathname } = useLocation();
  const [gradeName, blockName] = pathname.split("/").slice(1);
  const progressItem = useSelector(state => {
    const grade = state.userAuth.progress.find(grade => grade.gradeName === gradeName);
    return grade?.blocks?.find(block => block.blockName === blockName)?.lastItem || 0;
  });

  useEffect(() => {
    setHasWatched(false);
  }, [id]);

  const handleCheck = () => {
    if (isEnded) setHasWatched(true);
    const blockProgress = Number(
      parseFloat((currentVideo / data.length) * 100).toFixed(2),
    );
    if (currentVideo > progressItem) {
      dispatch(
        updateProgress({ gradeName, blockName, lastItem: currentVideo, blockProgress }),
      );
      dispatch(updateGradeProgress({ gradeName }));
    }
  };

  const handlePrev = () => {
    if (currentVideo > 1) {
      navigate(`/${gradingPath}/${pagePath}/${currentVideo - 1}`);
    }
  };

  const handleNext = () => {
    if (currentVideo < data.length) {
      navigate(`/${gradingPath}/${pagePath}/${currentVideo + 1}`);
    }
  };

  const watchingBtn = (
    <button
      className={`video__button ${!isEnded ? "disabled" : ""}`}
      disabled={!isEnded}
      onClick={handleCheck}
    >
      <img src={check} alt="video-checked" />
      <p>Я посмотрела</p>
    </button>
  );

  const watchedBtn = (
    <button
      className={`video__button ${currentVideo === data.length ? "disabled" : ""}`}
      disabled={currentVideo === data.length}
      onClick={handleNext}
    >
      <img src={next} alt="video-next" />
      <p>Следующее видео</p>
    </button>
  );

  const prevBtn = (
    <button
      className={`video__button ${currentVideo === 1 ? "disabled" : ""}`}
      onClick={handlePrev}
      disabled={currentVideo === 1}
    >
      <img src={prev} alt="video-prev" />
      <p>Предыдущее видео</p>
    </button>
  );

  const catImg = (
    <div className="video__cat">
      <img className="bg-image__cat" src={catBottomPic} alt="video_cat" />
    </div>
  );

  return (
    <div className="video__nav">
      {prevBtn}
      {catImg}
      {hasWatched ? watchedBtn : watchingBtn}
    </div>
  );
}

export default VideoPlayerPagination;
