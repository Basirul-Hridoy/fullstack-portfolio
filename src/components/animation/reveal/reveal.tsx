'use client';

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { revealVariants } from './revealVarient';
const Reveal: FC<{ words: string }> = ({ words }) => {
    const wordArray = words.split(' ').map((word, id) => ({ id, word }));

    const text = wordArray.map(({ id, word }) => (
        <span key={id} className='me-2 inline-flex overflow-hidden'>
            <motion.span
                custom={id}
                variants={revealVariants}
                initial='initial'
                whileInView='open'
            >
                {word}
            </motion.span>
        </span>
    ));

    return (
        <>
            {text}
        </>
    );
};

export default Reveal;