import React from 'react';
import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import { useThemeContext } from "../../ThemeContext";
import { AedServiceDetailsType } from "./constants";
import Attachment from "../../services/Attachment";

type AedServiceDetailsCollectionType = {
    data?: AedServiceDetailsType;
}

const AedServiceDetails: React.FC<AedServiceDetailsCollectionType> = ({ data }) => {
    const { themeMode } = useThemeContext();
    const theme = useTheme();
    const { downloadAttachment } = new Attachment();

    const handleDownloadClicked = (id: any) => {
        downloadAttachment(id).then();
    }

    const itemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingX: 2,
        paddingY: 1,
    };

    return (
        <Paper
            className={`main-container-${themeMode}`}
            sx={{
                direction: 'rtl',  // Keep RTL if your layout is RTL, remove if LTR needed
                p: { xs: 2, sm: 4 },
                maxWidth: 720,
                margin: 'auto',
                borderRadius: 3,
                boxShadow: theme.shadows[4],
                bgcolor: theme.palette.background.paper,
            }}
            elevation={6}
            component="section"
            aria-label="AED Service Details"
        >
            <List disablePadding>
                {/* Basic Info */}
                {[
                    { label: '⚒️ Process', value: data?.correctiveActionGroup },
                    // { label: '📅 Call DateTime', value: data?.callDate },
                    { label: '📅 Visit DateTime', value: data?.visitDate },
                    { label: '👤 Expert', value: data?.user.fullName },
                    { label: '🗺️ Province', value: data?.user.province },
                    { label: '😖 Non Conformity', value: data?.nonConformity },
                    { label: '💰 Cost', value: data?.cost },
                    { label: '📝 Description', value: data?.description },
                ].map(({ label, value }, index) => (
                    <React.Fragment key={index}>
                        <ListItem sx={itemStyle}>
                            <Typography variant="subtitle1" fontWeight={700} color={theme.palette.text.primary}>
                                {label}
                            </Typography>
                            <Typography
                                variant="body2"
                                color={value ? theme.palette.text.secondary : theme.palette.text.disabled}
                                sx={{ maxWidth: '60%', textAlign: 'left', wordBreak: 'break-word' }}
                            >
                                {value || '—'}
                            </Typography>
                        </ListItem>
                        {index < 7 && <Divider component="li" />}
                    </React.Fragment>
                ))}

                {/* Replacement Parts */}
                <ListItem sx={{ px: 2, pt: 3, pb: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                        🔧 Replacement Parts ({data?.replacementParts?.length || 0})
                    </Typography>
                </ListItem>
                <Divider component="li" />
                {data?.replacementParts && data.replacementParts.length > 0 ? (
                    data.replacementParts.map((rp, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                                borderRadius: 2,
                                p: 2,
                                my: 2,
                                boxShadow: 1,
                                transition: 'transform 0.15s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    boxShadow: 6,
                                    cursor: 'pointer',
                                },
                            }}
                            role="group"
                            aria-label={`Replacement part number ${idx + 1}`}
                        >
                            {[
                                { label: '📟 Previous Serial Number', value: rp.prevSerialNumber },
                                { label: '📛 Previous Part Name', value: rp.prevPartName },
                                { label: '🔢 Previous Part Number', value: rp.prevPartNumber },
                                { label: '🆕 New Serial Number', value: rp.newSerialNumber },
                                { label: '🆕 New Part Name', value: rp.newPartName },
                                { label: '🔢 New Part Number', value: rp.newPartNumber },
                            ].map(({ label, value }, i) => (
                                <ListItem key={i} sx={{ justifyContent: 'space-between', px: 0, py: 0.5 }}>
                                    <Typography fontWeight={600} variant="body2" color={theme.palette.text.primary}>
                                        {label}:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color={value ? theme.palette.text.secondary : theme.palette.text.disabled}
                                        sx={{ maxWidth: '60%', textAlign: 'left', wordBreak: 'break-word' }}
                                    >
                                        {value || '—'}
                                    </Typography>
                                </ListItem>
                            ))}
                        </Box>
                    ))
                ) : (
                    <ListItem>
                        <Typography
                            color={theme.palette.text.disabled}
                            fontStyle="italic"
                            align="center"
                            width="100%"
                        >
                            🚫 No replacement parts found.
                        </Typography>
                    </ListItem>
                )}

                {/* Attachments */}
                <ListItem sx={{ px: 2, pt: 3, pb: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                        📎 Attachments ({data?.attachments?.length || 0})
                    </Typography>
                </ListItem>
                <Divider component="li" />
                {data?.attachments && data.attachments.length > 0 ? (
                    data.attachments.map((attachment, idx) => (
                        <ListItem
                            key={idx}
                            sx={{
                                justifyContent: 'space-between',
                                px: 2,
                                py: 1,
                                bgcolor: idx % 2 === 0 ? theme.palette.action.hover : 'transparent',
                                borderRadius: 1,
                                transition: 'background-color 0.3s',
                                '&:hover': { bgcolor: theme.palette.action.selected },
                                flexWrap: 'wrap',
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: 300,
                                    userSelect: 'text',
                                }}
                                title={attachment.fileName}
                            >
                                {attachment.fileName}
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleDownloadClicked(attachment?.id)}
                                aria-label={`Download file ${attachment.fileName}`}
                                sx={{
                                    ml: { xs: 0, sm: 2 },
                                    mt: { xs: 1, sm: 0 },
                                    minWidth: 100,
                                }}
                            >
                                Download
                            </Button>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <Typography
                            color={theme.palette.text.disabled}
                            fontStyle="italic"
                            align="center"
                            width="100%"
                        >
                            🚫 No attachments found.
                        </Typography>
                    </ListItem>
                )}
            </List>
        </Paper>
    );
};

export default AedServiceDetails;
