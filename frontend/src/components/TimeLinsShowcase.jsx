import { Box, Typography, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CustomTimeline = () => {
  const navigate = useNavigate();

  const timelineSpan = 72;  // 2019 to end of 2024, in months

  const events = [
    {
      label: 'Lehigh University',
      type: 'education',
      from: 0, // Aug 2019 (start)
      to: 45, // May 2023 (end)
      description: 'B.S. in Computer Science & Economics',
    },
    {
      label: 'Carnegie Mellon University',
      type: 'education',
      from: 48, // Aug 2023
      to: 63, // Dec 2024
      description: 'M.S. in Software Engineering',
    },
    {
      label: 'Influxer Internship',
      type: 'work',
      from: 56, // May 2024
      to: 59, // August 2024
      onClick: () => navigate('/work#influxer'),
    },
  ];

  return (
    <Box sx={{ overflowX: 'auto', px: 4, py: 6 }}>
      <Box sx={{ minWidth: 1200, position: 'relative', height: 100 }}>
        {/* Timeline Line */}
        <Box
          sx={{
            position: 'absolute',
            top: 48,
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
              left: `${(index * 12 / timelineSpan) * 100}%`,
              top: 60,
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

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Tooltip
                title={
                  event.type === 'education' ? (
                    <>
                      <Typography fontWeight={600}>{event.label}</Typography>
                      <Typography variant="body2">{event.description}</Typography>
                    </>
                  ) : null
                }
                arrow
              >
                <Box
                  onClick={event.onClick}
                  sx={{
                    position: 'absolute',
                    top: 34,
                    left: `${left}%`,
                    width: `${width}%`,
                    height: 32,
                    bgcolor: event.type === 'education' ? '#2196f3' : '#43a047',
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
