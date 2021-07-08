/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { slideRight, slideLeft, slideUp } from 'shared/animations';
import sideColumn from '../../components/SideColumn/SideColumn.module.scss';
import assessment from './Assessment.module.scss';
import centerIcons from '../../components/CenterIcons/CenterIcons.module.scss';

function useAssessmentAnimations(totalMatchesCount: number): void {
  const [groupsMatched, setGroupsMatched] = useState(0);
  useEffect(animateSideIcons, [groupsMatched]);
  useEffect(animateCenterSection, []);
  useEffect(animateCenterIcons, [groupsMatched]);

  useEffect(() => {
    const newGroupsMatched = Math.floor(totalMatchesCount / 3);
    setGroupsMatched(newGroupsMatched);
  }, [totalMatchesCount]);

  function animateSideIcons() {
    gsap.from(`.${sideColumn.leftIcon}`, {
      ...slideLeft,
      stagger: 0.15,
      delay: 0.5,
    });
    gsap.from(`.${sideColumn.rightIcon}`, {
      ...slideRight,
      stagger: 0.15,
      delay: 0.5,
    });
  }

  function animateCenterSection() {
    gsap.from(`.${assessment.centerSection}`, {
      ...slideUp,
      delay: 1,
    });
  }

  function animateCenterIcons() {
    gsap.from(`.${centerIcons.draggable}`, {
      ...slideUp,
      delay: groupsMatched === 0 ? 1 : 0.2,
      stagger: 0.15,
    });
  }
}

export default useAssessmentAnimations;
