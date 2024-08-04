import React from 'react';
import '../css/cel.css';
import { Link } from 'react-router-dom';
    
export const Cel = () => {
    return (
        <nav className="navbar">
        <buttonn
          onClick={() => document.body.classList.toggle('open')}
          className="burger"
        ></buttonn>
        <h11>J</h11>
        <div className="dropdowns">
          <div className="dropdown">
            <button>
              Services
              <img src="chevron.svg" alt="chevron" />
            </button>
            <div className="dropdown-menu">
              <button>UX/UI Design</button>
              <button>Web Applications</button>
              <button>SEO Advice</button>
            </div>
          </div>
          {/* 2x more dropdowns */}
        </div>
        <div className="dropdowns">
          <div className="dropdown">
            <button>
              Services
              <img src="chevron.svg" alt="chevron" />
            </button>
            <div className="dropdown-menu">
              <button>UX/UI Design</button>
              <button>Web Applications</button>
              <button>SEO Advice</button>
            </div>
          </div>
          {/* 2x more dropdowns */}
        </div>
        <div className="dropdowns">
          <div className="dropdown">
            <button>
              Services
              <img src="chevron.svg" alt="chevron" />
            </button>
            <div className="dropdown-menu">
              <button>UX/UI Design</button>
              <button>Web Applications</button>
              <button>SEO Advice</button>
            </div>
          </div>
          {/* 2x more dropdowns */}
        </div>
      </nav>
    );
};

