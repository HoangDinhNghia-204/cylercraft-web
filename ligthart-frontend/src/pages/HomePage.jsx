import React, { useState } from 'react';
import AccordionItem from '../components/AccordionItem';
import useScrollAnimation from '../hooks/useScrollAnimation';
import LatestPost from '../components/LatestPost';

const faqData = [
  {
    id: 1,
    title: '🕹️ Phiên bản máy chủ',
    content: 'Máy chủ đang hoạt động trên phiên bản 1.20.1',
  },
  {
    id: 2,
    title: '📚 Mình có thể tìm hiểu về các cơ chế/công thức/các tính năng của máy chủ ở đâu?',
    content: 'Bạn có thể tìm hiểu các công thức hoặc tính năng máy chủ ở #🍃・ʟᴀs-ᴡɪᴋɪ trong discord hoặc <a href="/wiki"><u>ở đây.</u></a>',
  },
  {
    id: 3,
    title: '🎙️ Máy chủ của bạn có tính năng voice chat không?',
    content: 'Có, bạn hoàn toàn có thể sử dụng mod PlasmoVoice để nói chuyện với bạn bè trong máy chủ.',
  },
  {
    id: 4,
    title: '🔑 Có cần tài khoản premium để vào máy chủ không?',
    content: 'Không, bạn hoàn toàn có thể dùng các phiên bản crack để vào máy chủ',
  },
  {
    id: 5,
    title: '⏰ Máy chủ có hoạt động liên tục không?',
    content: 'Máy chủ sẽ được hoạt động liên tục 24/7 trừ những lúc bảo trì và fix lỗi.',
  },
  {
    id: 6,
    title: '🍕 Có thể vào bằng điện thoại không?',
    content: 'Có, bạn hoàn toàn có thể dùng phiên bản Bedrock trên điện thoại để vào máy chủ và máy chủ cũng hỗ trợ resoucepack cho bedrock.',
  }
];

const HomePage = () => {
  const [openAccordionId, setOpenAccordionId] = useState(null);

  const handleAccordionToggle = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };
  
  return (
    <main>
        <div className="container">
            <LatestPost />

            <div className="content-block">
                <div className="intro__content">
                    <div className="intro__text">
                    <h1 className="title__text">Máy chủ sinh tồn hấp dẫn</h1>
                    <p className="regular__text">
                        Bước vào vương quốc sinh tồn khắc nghiệt – không đặc quyền, chỉ có sức mạnh và ý chí! ⚔️
                    </p>
                    <a href="#info2" className="intro__btn">
                        <button className="profile__button">Tìm hiểu thêm</button>
                    </a>
                    </div>
                    <div className="intro__image">
                    <img src="/images/intro.webp" alt="Intro" />
                    </div>
                </div>
            </div>

            <div className="content-block" id="info2">
                <div className="info__content">
                    <div className="info__text">
                        <h1 className="title__text">Về máy chủ</h1>
                        <p className="regular__text">
                            Đây là một máy chủ sinh tồn hấp dẫn với nhiều cơ chế đặc biệt như.
                        </p>
                        <p className="regular__text">
                            Khám phá thế giới sinh tồn medieval độc đáo, nơi chúng tôi cung cấp resource packs cho cả Bedrock và Java! Tham gia cùng cộng đồng thân thiện, xây dựng và khám phá những lâu đài kỳ vĩ, và trải nghiệm những cuộc phiêu lưu đầy thử thách.
                        </p>
                    </div>
                    <div className="info__img">
                        <img src="/images/info.webp" alt="About server" />
                    </div>
                </div>
            </div>

            <div className="content-block">
                <h1 className="title__text">✨ Máy chủ có những gì?</h1>
                <div className="cards__content">
                    <div className="card">
                        <div className="card__icon"><img src="/images/icons/perf.svg" alt="Icon" /></div>
                        <h2 className="card__title">🚀 Máy chủ ổn định</h2>
                        <p>Máy chủ được thuê với cấu hình hosting tốt nhất và tối ưu nên đảm bảo được 20 TPS về độ ổn định.</p>
                    </div>
                    <div className="card">
                        <div className="card__icon"><img src="/images/icons/users.svg" alt="Icon" /></div>
                        <h2 className="card__title">🍾 Có cộng đồng năng động</h2>
                        <p>Một cộng đồng thân thiện mang lại môi trường thoải mái và vui vẻ cho bạn!</p>
                    </div>
                    <div className="card">
                        <div className="card__icon"><img src="/images/icons/ai.svg" alt="Icon" /></div>
                        <h2 className="card__title">🌆 Máy chủ có sự sáng tạo</h2>
                        <p>Máy chủ có những tính năng và resoucepack mới lạ khiến bạn không cảm giác nhàm chán!</p>
                    </div>
                </div>
            </div>

            <div className="content-block">
                <div className="info__content">
                     <div className="info__text">
                        <h1 className="title__text">🪁 Khám phá máy chủ</h1>
                        <p className="regular__text">
                            Các plugin độc đáo trên máy chủ của chúng tôi mang lại sự đa dạng và thú vị cho trò chơi, như các lệnh để hỗ trợ người chơi, nhiệm vụ, hệ thống kĩ năng, và nhiều hơn nữa.
                        </p>
                    </div>
                    <div className="info__img">
                        <img src="/images/info3.webp" alt="Explore server" />
                    </div>
                </div>
            </div>

            <div className="content-block">
                <h1 className="title__text">📋 Câu hỏi thường gặp</h1>
                <ul className="accordion__list">
                    {faqData.map((item) => (
                    <AccordionItem
                        key={item.id}
                        item={item}
                        isOpen={openAccordionId === item.id}
                        onToggle={() => handleAccordionToggle(item.id)}
                    />
                    ))}
                </ul>
            </div>

            <div className="content-block">
                <div className="discord__content">
                    <div className="discord__text">
                        <h1 className="title__text">🍕 Nếu bạn còn thắc mắc</h1>
                        <p className="regular__text">
                            Hãy vào discord và hỏi để được giải đáp thắc mắc nhé!
                        </p>
                        <a href="https://discord.gg/x42jbZ7QPb" target="_blank" rel="noopener noreferrer">
                            <button className="profile__button">Tới Discord</button>
                        </a>
                    </div>
                    <div className="discord__img">
                        <img src="/images/discord.webp" alt="Discord" />
                    </div>
                </div>
            </div>

        </div>
    </main>
  );
};

export default HomePage;