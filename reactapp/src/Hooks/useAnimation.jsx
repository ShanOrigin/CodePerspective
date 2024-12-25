import Animation from '../Animation/running_script_test.js';

const useAnimation = async (animation) => {
  try {
    const animationData = await Animation(animation);
    console.log(animationData);
    if (animationData.length > 1) {
      return animationData;
    }
  } catch (e) {
    console.log(e);
  }
};

export default useAnimation;
