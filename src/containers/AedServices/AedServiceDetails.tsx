import React, {useEffect, useRef, useState} from 'react';
import {Box, Divider, List, ListItem, Paper, Typography} from '@mui/material';
import {useThemeContext} from "../../ThemeContext";
import {AedServiceDetailsType} from "./constants";

type AedServiceDetailsCollectionType = {
    data?: AedServiceDetailsType;
}

const AedServiceDetails: React.FC<AedServiceDetailsCollectionType> = ({data}) => {
    const {themeMode} = useThemeContext();

    return (
        <Paper className={`main-container-${themeMode}`} sx={{direction: 'rtl', p: 2}}>
            <>
                <List disablePadding>
                    <ListItem
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2,
                        }}
                    >
                        <Typography sx={{fontWeight: 600}}>
                            ⚒️ Corrective Action Group
                        </Typography>

                        <Typography color="text.secondary">
                            {data?.correctiveActionGroup || "—"}
                        </Typography>
                    </ListItem>

                    <Divider/>

                    <ListItem
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2,
                        }}
                    >
                        <Typography sx={{fontWeight: 600}}>
                            📅 Call DateTime
                        </Typography>

                        <Typography color="text.secondary">
                            {data?.callDate || "—"}
                        </Typography>
                    </ListItem>

                    <Divider/>

                    <ListItem
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2,
                        }}
                    >
                        <Typography sx={{fontWeight: 600}}>
                            📅 Visit DateTime
                        </Typography>
                        <Typography color="text.secondary">
                            {data?.visitDate || "—"}
                        </Typography>
                    </ListItem>

                    <Divider/>

                    <ListItem
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2,
                        }}
                    >
                        <Typography sx={{fontWeight: 600}}>
                            👤 Expert
                        </Typography>
                        <Typography color="text.secondary">
                            {data?.user.fullName || "—"}
                        </Typography>
                    </ListItem>

                    <Divider/>

                    <ListItem
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2,
                        }}
                    >
                        <Typography sx={{fontWeight: 600}}>
                            🗺️ Province
                        </Typography>
                        <Typography color="text.secondary">
                            {data?.user.province || "—"}
                        </Typography>
                    </ListItem>

                    <Divider/>

                    <ListItem
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2,
                        }}
                    >
                        <Typography sx={{fontWeight: 600}}>
                            😖 Non Conformity
                        </Typography>
                        <Typography color="text.secondary">
                            {data?.nonConformity || "—"}
                        </Typography>
                    </ListItem>

                    <Divider/>

                    <ListItem
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2,
                        }}
                    >
                        <Typography sx={{fontWeight: 600}}>
                            💰 Cost
                        </Typography>
                        <Typography color="text.secondary">
                            {data?.cost || "—"}
                        </Typography>
                    </ListItem>

                    <Divider/>

                    <ListItem
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2,
                        }}
                    >
                        <Typography sx={{fontWeight: 600}}>
                            📝 Description
                        </Typography>
                        <Typography color="text.secondary">
                            {data?.description || "—"}
                        </Typography>
                    </ListItem>

                    <Divider/>

                    <ListItem>
                        <Typography sx={{fontWeight: 600}}>
                            🔧 Replacement Parts ({data?.replacementParts?.length || 0})
                        </Typography>
                    </ListItem>

                    <Divider/>

                    {data?.replacementParts && data.replacementParts.length > 0 ? (
                        data.replacementParts.map((rp, index) => (
                            <Box
                                key={index}
                                sx={{
                                    bgcolor: themeMode === 'dark' ? 'grey.900' : 'grey.100',
                                    borderRadius: 2,
                                    p: 2,
                                    my: 2,
                                    boxShadow: 2,
                                    transition: 'transform 0.2s',
                                    '&:hover': {transform: 'scale(1.02)', boxShadow: 6},
                                }}
                            >
                                <ListItem sx={{justifyContent: 'space-between', px: 0, py: 0.5}}>
                                    <Typography fontWeight={600}>📟 Previous Serial Number:</Typography>
                                    <Typography color="text.secondary">{rp.prevSerialNumber || '—'}</Typography>
                                </ListItem>

                                <ListItem sx={{justifyContent: 'space-between', px: 0, py: 0.5}}>
                                    <Typography fontWeight={600}>📛 Previous Part Name:</Typography>
                                    <Typography color="text.secondary">{rp.prevPartName || '—'}</Typography>
                                </ListItem>

                                <ListItem sx={{justifyContent: 'space-between', px: 0, py: 0.5}}>
                                    <Typography fontWeight={600}>🔢 Previous Part Number:</Typography>
                                    <Typography color="text.secondary">{rp.prevPartNumber || '—'}</Typography>
                                </ListItem>

                                <Divider sx={{my: 1}}/>

                                <ListItem sx={{justifyContent: 'space-between', px: 0, py: 0.5}}>
                                    <Typography fontWeight={600}>🆕 New Serial Number:</Typography>
                                    <Typography color="text.secondary">{rp.newSerialNumber || '—'}</Typography>
                                </ListItem>

                                <ListItem sx={{justifyContent: 'space-between', px: 0, py: 0.5}}>
                                    <Typography fontWeight={600}>🆕 New Part Name:</Typography>
                                    <Typography color="text.secondary">{rp.newPartName || '—'}</Typography>
                                </ListItem>

                                <ListItem sx={{justifyContent: 'space-between', px: 0, py: 0.5}}>
                                    <Typography fontWeight={600}>🔢 New Part Number:</Typography>
                                    <Typography color="text.secondary">{rp.newPartNumber || '—'}</Typography>
                                </ListItem>
                            </Box>
                        ))
                    ) : (
                        <ListItem>
                            <Typography color="text.secondary" fontStyle="italic" align="center" width="100%">
                                🚫 No replacement parts found.
                            </Typography>
                        </ListItem>
                    )}

                </List>
            </>
        </Paper>
    );
};

export default AedServiceDetails;