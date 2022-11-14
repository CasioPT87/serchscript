const React = require("react");
const { useSelector } = require("react-redux");

const Header = () => {
  return (
    <div class="menu cf">
      <a href="#" class="menu__trigger js-trigger">
        <i class="ion-navicon-round"></i>
      </a>

      <ul class="menu__row">
        <li class="menu__list">
          <a href="#" class="menu__link">
            About
          </a>
        </li>

        <li class="menu__list">
          <a href="#" class="menu__link">
            Blog
          </a>
        </li>

        <li class="menu__list">
          <a href="#" class="menu__link">
            Contact
          </a>
        </li>
      </ul>

      <div class="menu__dropdown cf js-menu">
        <div class="menu__col">
          <h2>First Random Title</h2>
          <p>
            Lorem ipsum dolor sit amet, nam in omnesque oporteat instructior, ut
            mea euismod maiorum omnesque. In eum mutat iriure, vel id aeque
            libris impedit, dicat liber duo ne. Equidem torquatos ex vix, et quo
            vocent mediocritatem, usu ex ubique electram conclusionemque. Mel id
            saepe veniam rationibus, audiam adipiscing ei ius. Quis ferri
            reprehendunt ex vel, ad aliquip aperiam recteque vim, ei debitis
            appetere signiferumque pri.
          </p>
        </div>

        <div class="menu__col">
          <h2>Second Random Title</h2>
          <p>
            <p>
              Lorem ipsum dolor sit amet, nam in omnesque oporteat instructior,
              ut mea euismod maiorum omnesque. In eum mutat iriure, vel id aeque
              libris impedit, dicat liber duo ne. Equidem torquatos ex vix, et
              quo vocent mediocritatem, usu ex ubique electram conclusionemque.
              Mel id saepe veniam rationibus, audiam adipiscing ei ius. Quis
              ferri reprehendunt ex vel, ad aliquip aperiam recteque vim, ei
              debitis appetere signiferumque pri.
            </p>
          </p>
        </div>

        <div class="menu__col">
          <h2>The third and last random title</h2>
          <p>
            <p>
              Lorem ipsum dolor sit amet, nam in omnesque oporteat instructior,
              ut mea euismod maiorum omnesque. In eum mutat iriure, vel id aeque
              libris impedit, dicat liber duo ne. Equidem torquatos ex vix, et
              quo vocent mediocritatem, usu ex ubique electram conclusionemque.
              Mel id saepe veniam rationibus, audiam adipiscing ei ius. Quis
              ferri reprehendunt ex vel, ad aliquip aperiam recteque vim, ei
              debitis appetere signiferumque pri.
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

module.exports = Header;
