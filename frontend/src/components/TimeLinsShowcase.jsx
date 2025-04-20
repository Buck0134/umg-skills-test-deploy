import { Box, Typography, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CustomTimeline = () => {
  const navigate = useNavigate();

  // Compressed early years (2019–2022) with weighted span logic
  const monthsPerYear = [
    6,  // 2019 (Aug–Dec)
    6,  // 2020 (compressed)
    6,  // 2021 (compressed)
    6,  // 2022 (compressed)
    12, // 2023
    12, // 2024
  ];
  const monthOffsets = monthsPerYear.reduce((acc, months, idx) => {
    acc.push((acc[idx - 1] || 0) + months);
    return acc;
  }, []);

  const timelineSpan = monthOffsets[monthOffsets.length - 1];

  const events = [
    {
      label: 'Lehigh University',
      type: 'education',
      from: 0,
      to: 21,
      description: 'B.S. in Computer Science & Economics',
    },
    {
      label: 'Carnegie Mellon University',
      type: 'education',
      from: 24,
      to: 35,
      description: 'M.S. in Software Engineering',
    },
    {
      label: 'Influxer Internship',
      type: 'work',
      from: 32,
      to: 35,
      onClick: () => navigate('/work#influxer'),
    },
  ];

  return (
    <Box sx={{ overflowX: 'auto', px: 4, py: 6 }}>
      <Box sx={{ minWidth: 1200, position: 'relative', height: 140 }}>
        {/* Timeline Line */}
        <Box
          sx={{
            position: 'absolute',
            top: 65,
            left: 0,
            right: 0,
            height: 4,
            bgcolor: '#ccc',
          }}
        />

        {/* Year markers */}
        {[2019, 2020, 2021, 2022, 2023, 2024].map((year, index) => (
          <Box
            key={year}
            sx={{
              position: 'absolute',
              left: `${(monthOffsets[index - 1] || 0) / timelineSpan * 100}%`,
              top: 80,
              transform: 'translateX(-50%)',
              fontSize: '0.8rem',
              color: '#666',
            }}
          >
            {year}
          </Box>
        ))}

        {/* Event blocks */}
        {events.map((event, index) => {
          const left = (event.from / timelineSpan) * 100;
          const width = ((event.to - event.from) / timelineSpan) * 100;
          const isEducation = event.type === 'education';

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Tooltip
                title={isEducation ? (
                  <>
                    <Typography fontWeight={600}>{event.label}</Typography>
                    <Typography variant="body2">{event.description}</Typography>
                  </>
                ) : event.label}
                arrow
              >
                <Box
                  onClick={event.onClick}
                  sx={{
                    position: 'absolute',
                    top: isEducation ? 75 : 15,
                    left: `${left}%`,
                    width: `${width}%`,
                    height: 32,
                    bgcolor: isEducation ? '#2196f3' : '#43a047',
                    borderRadius: 1,
                    cursor: event.onClick ? 'pointer' : 'default',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                />
              </Tooltip>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default CustomTimeline;