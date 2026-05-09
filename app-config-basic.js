window.config = {
  routerBasename: "/",
  extensions: [],
  modes: [],
  // showStudyList: true untuk keperluan debug dahulu
  showStudyList: false,
  investigationalUseDialog: {
    option: 'never',
  },
  whiteLabeling: {
    createLogoComponentFn: function (React) {
      return React.createElement(
        'div',
        {
          className: 'flex items-center gap-3',
        },
        // Tombol back / Close
        React.createElement(
          'button',
          {
            onClick: () => {
              if (window.opener) {
                window.close();
              } else {
                window.history.back();
              }
            },
            className:
              'text-white px-2 py-1 rounded hover:bg-gray-700',
            title: 'Kembali',
          },
          // SVG Icon
          React.createElement(
            'svg',
            {
              xmlns: 'http://www.w3.org/2000/svg',
              width: '24',
              height: '24',
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: '2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            },

            React.createElement('path', {
              d: 'M19 12H5',
            }),

            React.createElement('path', {
              d: 'M12 19l-7-7 7-7',
            })
          )
        ),
        // Title
        React.createElement(
          'h5',
          {
            className: 'text-white text-lg font-bold m-0',
          },
          'RSUD PANGGUL - DICOM VIEWER'
        )
      );
    },
  },
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'DCM4CHEE Basic PACS',
        name: 'DCM4CHEE',
        wadoUriRoot: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/wado',
        qidoRoot: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        qidoSupportsIncludeField: true,
        supportsReject: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: true,
        omitQuotationForMultipartRequest: true,
      },
    },
  ],
  defaultDataSourceName: 'dicomweb',
};

document.title = 'RSUD PANGGUL - DICOM VIEWER';

const hideAbout = () => {
  document.querySelectorAll('div[role="menuitem"]').forEach(el => {
    if (el.textContent.trim() === 'About') {
      el.remove();
    }
  });
};

setInterval(hideAbout, 1000);
