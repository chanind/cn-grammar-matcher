import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import classes from './IntroPage.scss';
import Sentence from './Sentence.jsx';

const sampleInput = '晚上六点以后，有的人下班了，有的人在加班。';
const sampleOutput = [
  {
    id: 'oClock',
    structures: ['(Date and/or time of day +) x 点', 'x 点 + 半'],
    description:
      'Time in Chinese, just like in English, is expressed by stating the hour first, and then the minute (big to small).',
    sources: [
      {
        type: 'website',
        url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
        name: 'AllSet Chinese Grammar Wiki',
      },
    ],
    examples: [
      {
        zh: '九点',
        en: "9 o'clock",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '上午七点',
        en: "7 o'clock a.m.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '下午四点',
        en: "4 o'clock p.m.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '中午十二点',
        en: "12 o'clock noon",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '明天晚上七点',
        en: "7 o'clock p.m. tomorrow evening",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '9月9号早上六点',
        en: "September 9th, 6 o'clock a.m.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '星期三上午九点',
        en: "Wednesday at 9 o'clock a.m.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '五点半',
        en: '5:30',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '下午两点半',
        en: '2:30 p.m.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '星期天上午十点半',
        en: 'Sunday at 10:30 a.m.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '昨天晚上七点半',
        en: '7:30 yesterday evening',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '今天下午四点半',
        en: '4:30 p.m. this afternoon.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGN6BBU',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
    ],
    matches: [
      [
        {
          start: 2,
          end: 4,
        },
      ],
    ],
  },
  {
    id: 'youde',
    structures: ['有的 + (Subj.) + Predicate， 有的 + (Subj.) + Predicate'],
    description:
      'To refer to just certain members of group, you can use 有的 (yǒude). This usage is normally translated as "some" in English. It is often used multiple times in one sentence to refer to different groups.',
    sources: [
      {
        type: 'website',
        url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
        name: 'AllSet Chinese Grammar Wiki',
      },
    ],
    examples: [
      {
        zh: '外国人有的很有钱，有的没钱。',
        en: "Some foreigners are rich, but some aren't.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '我们公司有一些电脑，有的是新的，有的是旧的。',
        en: 'Our company has some computers. Some are new, and some are old.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '他写了很多书，有的卖得很好，有的卖得不好。',
        en: "He has written a lot of books. Some sell well, but some don't.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '中国菜有的好吃，有的不好吃。',
        en: "Some Chinese foods are tasty, while some aren't.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '这家店的衣服有的贵，有的便宜。',
        en: 'In this shop, some of the clothes are expensive and some are cheap.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '他有很多房子，有的在国内，有的在国外。',
        en:
          'He has a lot of houses, some of them are within the country and some are abroad.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '晚上六点以后，有的人下班了，有的人在加班。',
        en: "After six o'clock some people are off work, while some are still working.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '我的大学老师有的很年轻，有的很老。',
        en: 'Some of my college teachers are young, some are old.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '酒吧里，有的人在喝酒，有的人在跳舞，还有的人在聊天。',
        en:
          'In the bar, some people are drinking, some are dancing, and some are chatting.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '因为工作，我认识了很多人，有的是大学老师，有的是CEO。',
        en:
          'I know a lot of people because of my work. Some are college teachers and some are CEOs.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG4NDHB',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
    ],
    matches: [
      [
        {
          start: 7,
          end: 9,
        },
        {
          start: 14,
          end: 16,
        },
      ],
    ],
  },
  {
    id: 'yihou',
    structures: [
      'Subj. + Special Time + 以后／之后 + Action',
      '以后，Comment',
      'Subj. + Event， 之后 + Action',
    ],
    description:
      'If you are trying to explain what you did after a certain event, you might want to use "以后" (yǐhòu) or "之后" (zhīhòu). After all, they do both mean "after," right? Well, it turns out that there are a few rules that you need to be aware of before you use them.',
    sources: [
      {
        type: 'website',
        url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
        name: 'AllSet Chinese Grammar Wiki',
      },
    ],
    examples: [
      {
        zh: '下过雨以后/之后空气会好很多。',
        en: 'After it rains, the air will be a lot better.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '结婚以后/之后他们有了两个宝宝。',
        en: 'After getting married, they had two babies.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '等我涨工资以后/之后请你吃饭。',
        en: 'After I get a raise, I will treat you to a meal.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '听到这个消息以后/之后，我高兴得一晚上没睡。',
        en: "After I heard this news, I was so happy I couldn't sleep the whole night.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '以后再也不来这里吃饭了，又贵又难吃。',
        en:
          "In the future I will never come to this place to eat again. It's expensive and the food is not good.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '以后我可能会去国外上大学。',
        en: 'In the future I might go to college abroad.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '以后的事情以后再说吧。',
        en: "We'll talk about future things some time later.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '我要先回家把东西放下，之后去咖啡店找你。',
        en:
          "I'm going to go home and drop my stuff off first, then go to the cafe to look for you.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '去年夏天他来过我家，之后再也没见到他。',
        en: "Last summer, he came to my house. After that, I haven't seen him.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '房子涨价之后，越来越多的人开始买房。',
        en: 'After prices went up, more and more people started buying houses.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '我六点下班，之后，我去跟朋友吃饭。',
        en:
          "I will get off work at six o'clock, and after that I will meet with a friend to eat dinner.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '昨天我跟朋友吃完饭以后去了酒吧。',
        en: 'Yesterday, when my friends and I were done eating, we went to the bar.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '昨天我跟朋友去吃饭了，之后，我们去了酒吧。',
        en: 'Yesterday I ate dinner with a friend, and afterward we went to a bar.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASGC3SCN',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
    ],
    matches: [
      [
        {
          start: 4,
          end: 6,
        },
      ],
    ],
  },
  {
    id: 'expressingActionsInProgressWithZai',
    structures: ['Subj. + 在 + Verb + Obj.', 'Subj. + 正在 + Verb + Obj.'],
    description:
      '在 (zài) and 正在 (zhèngzài) can be used as auxiliary verbs to express that an action is ongoing or in progress. This is often the equivalent of present continuous in English, which is how we express that an activity is happening now.',
    sources: [
      {
        type: 'website',
        url: 'https://resources.allsetlearning.com/chinese/grammar/ASG846EA',
        name: 'AllSet Chinese Grammar Wiki',
      },
    ],
    examples: [
      {
        zh: '她在看书。',
        en: 'She is reading.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG846EA',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '妈妈在打电话。',
        en: 'Mom is making a phone call.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG846EA',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '阿姨正在打扫我们的房间。',
        en: 'The cleaning lady is cleaning our room right now.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG846EA',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '昨天晚上七点，我们在吃饭。',
        en: 'Yesterday at 7pm, we were eating dinner.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG846EA',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '我现在在上班，不方便离开。',
        en: "I am working now. It's not convenient for me to leave.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG846EA',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '我们正在上课，请你等一会儿。',
        en: 'We are in class right now; please wait a moment.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG846EA',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '你正在开车，不可以玩手机。',
        en: "You're driving right now; you can't play with your cell phone.",
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG846EA',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
      {
        zh: '你给我打电话的时候，我正在跟朋友打游戏。',
        en: 'When you called me, I was playing video games with friends.',
        src: {
          type: 'website',
          url: 'https://resources.allsetlearning.com/chinese/grammar/ASG846EA',
          name: 'AllSet Chinese Grammar Wiki',
        },
      },
    ],
    matches: [
      [
        {
          start: 17,
          end: 18,
        },
      ],
    ],
  },
];

class IntroPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightGrammar: 0,
      pause: false,
    };
  }

  componentDidMount() {
    this.demoInterval = setInterval(() => this.nextGrammar(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.demoInterval);
  }

  nextGrammar() {
    if (this.state.pause) {
      return;
    }
    const curIndex = this.state.highlightGrammar;
    const nextIndex = curIndex >= sampleOutput.length - 1 ? 0 : curIndex + 1;
    this.setState({ highlightGrammar: nextIndex });
  }

  getHighlightLocs() {
    const locs = [];
    const grammar = sampleOutput[this.state.highlightGrammar];
    for (const match of grammar.matches) {
      for (const loc of match) {
        locs.push(loc);
      }
    }
    return locs;
  }

  renderMiniDemo() {
    return (
      <div className={classNames(classes.miniDemo, 'container')}>
        <Sentence text={sampleInput} highlightLocations={this.getHighlightLocs()} />
        <div className={classes.jsonContainer}>
          {sampleOutput.map((grammar, i) =>
            <pre
              key={i}
              className={classNames(classes.miniDemoJson, {
                [classes.active]: i === this.state.highlightGrammar,
              })}
            >
              <div>
                {JSON.stringify(grammar, undefined, 2)}
              </div>
            </pre>
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {/*<nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <Link className={classNames('navbar-brand', classes.logoText)} to="/">
                Chinese Grammar Matcher
              </Link>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li><Link to="/demo">Demo</Link></li>
              </ul>
            </div>
          </div>
        </nav>*/}

        <div className={classes.hero}>
          <h1>Chinese Grammar Matcher</h1>
          <h4 className={classes.heroText}>
            Find grammar patterns in Chinese text using Javascript
          </h4>
          <div className={classes.actions}>
            <Link to={'/demo'} className="btn btn-default">
              View demo
            </Link>
            <Link to={'/docs'} className="btn btn-default">
              Get started
            </Link>
          </div>
        </div>

        {/*this.renderMiniDemo()*/}
        <div className={classNames(classes.gettingStarted, 'container')}>
          <h2>Getting started</h2>
          <p>
            Chinese grammar matcher is an open-source javascript library for finding
            grammar patterns in Chinese text. Most patterns are pulled from the excellent{' '}
            <a href="https://resources.allsetlearning.com/chinese/grammar">
              Allset grammar wiki
            </a>.
          </p>
          <p>
            Chinese grammar matcher requires an instance of the Stanford Core NLP server
            running with Chinese models. By default Chinese grammar matcher will use a
            public instance of the Core NLP server, but if you expect to have a lot of
            traffic it's best to run your own instance. The easiest way to get up and
            running with a Chinese version of Core NLP is with docker: `docker run -p
            9000:9000 --memory=4g skywidesoft/corenlp-chinese:3.7.0`
          </p>
        </div>
      </div>
    );
  }
}

IntroPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.function,
  }).isRequired,
};

export default IntroPage;
