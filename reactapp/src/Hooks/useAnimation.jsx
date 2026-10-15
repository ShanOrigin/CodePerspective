import Animation from '../Animation/running_script_test.js'

const useAnimation = async animation => {
  try {
    const animationData = await Animation(animation)

    if (Array.isArray(animationData) && animationData.length > 1) {
      return animationData
    }

    console.warn(`No animations found for: ${animation}`)
    return null
  } catch (error) {
    console.error(`Failed to initialize animation: ${animation}`, error)
    return null
  }
}

export default useAnimation