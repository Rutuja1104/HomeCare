import React from "react";

function PlusColorIcon() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_5069_86034)">
                <rect x="1" y="1" width="44" height="44" rx="22" fill="#087D9E" />
                <path
                    d="M21.4286 23.5714H15V21.4286H21.4286V15H23.5714V21.4286H30V23.5714H23.5714V30H21.4286V23.5714Z"
                    fill="#F8F8F8"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_5069_86034"
                    x="0"
                    y="0"
                    width="48"
                    height="48"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dx="1" dy="1" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.0588235 0 0 0 0 0.0901961 0 0 0 0 0.152941 0 0 0 0.35 0"
                    />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5069_86034" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5069_86034" result="shape" />
                </filter>
            </defs>
        </svg>
    );
}

export default PlusColorIcon;
