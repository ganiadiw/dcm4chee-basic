window.config = {
  routerBasename: "/",
  extensions: [],
  modes: [],
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
          'RSUD PANGGUL - RIS'
        )
      );
    },
  },
  customizationService: [
    {
      'viewportOverlay.topLeft': {
        $push: [
          {
            id: 'PatientNameOverlay',
            inheritsFrom: 'ohif.overlayItem',
            attribute: 'PatientName',
            label: 'PN:',
            title: 'Patient Name',
            color: 'white',
            condition: ({ instance }) =>
              instance &&
              instance.PatientName &&
              instance.PatientName.Alphabetic,
            contentF: ({ instance, formatters: { formatPN } }) =>
              formatPN(instance.PatientName.Alphabetic) +
              ' ' +
              (instance.PatientSex ? '(' + instance.PatientSex + ')' : ''),
          },
          {
            id: 'PatientIDOverlay',
            inheritsFrom: 'ohif.overlayItem',
            attribute: 'PatientID',
            label: 'MRN:',
            title: 'Medical Record Number',
            color: 'white',
            condition: ({ instance }) =>
              instance && instance.PatientID,
            contentF: ({ instance }) => instance.PatientID,
          },
          {
            id: 'PatientDOBOverlay',
            inheritsFrom: 'ohif.overlayItem',
            attribute: 'PatientBirthDate',
            label: 'DOB:',
            title: 'Date of Birth',
            color: 'white',

            condition: ({ instance }) =>
              instance && instance.PatientBirthDate,

            contentF: ({ instance }) => {
              const dob = instance.PatientBirthDate;

              if (!dob || dob.length !== 8) {
                return dob;
              }

              const year = dob.substring(0, 4);
              const month = dob.substring(4, 6);
              const day = dob.substring(6, 8);

              const months = {
                '01': 'Jan',
                '02': 'Feb',
                '03': 'Mar',
                '04': 'Apr',
                '05': 'Mei',
                '06': 'Jun',
                '07': 'Jul',
                '08': 'Agu',
                '09': 'Sep',
                '10': 'Okt',
                '11': 'Nov',
                '12': 'Des',
              };

              return `${day} ${months[month]} ${year}`;
            },
          },
          {
            id: 'PPSDescriptionOverlay',
            inheritsFrom: 'ohif.overlayItem',
            attribute: 'PerformedProcedureStepDescription',
            label: 'Exam:',
            title: 'Performed Procedure Step Description',
            color: 'white',

            condition: ({ instance }) =>
              instance &&
              instance.PerformedProcedureStepDescription,

            contentF: ({ instance }) =>
              instance.PerformedProcedureStepDescription,
          },
        ],
      },
    },
    {
      'downloadViewportModal.settings': {
        defaultFormat: 'png',
        defaultIncludeAnnotations: true,
        defaultIncludeWarning: false,
      },
    },
  ],
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'DCM4CHEE Basic PACS',
        name: 'DCM4CHEE',
        wadoUriRoot: 'http://10.1.1.20:8080/dcm4chee-arc/aets/DCM4CHEE/wado',
        qidoRoot: 'http://10.1.1.20:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'http://10.1.1.20:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
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

document.title = 'RSUD PANGGUL - RIS';