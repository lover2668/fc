package com.we.fc.intermediary.service.impl;

import com.we.fc.base.BaseDao;
import com.we.fc.base.BaseServiceImpl;
import com.we.fc.intermediary.dao.IntermediaryMapper;
import com.we.fc.intermediary.entity.Intermediary;
import com.we.fc.intermediary.service.IntermediaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mayn on 2018/4/11.
 */
@Service
public class IntermediaryServiceImpl extends BaseServiceImpl<Intermediary> implements IntermediaryService {

    @Autowired
    IntermediaryMapper intermediaryMapper;

    @Override
    public BaseDao<Intermediary> getDao() {
        return intermediaryMapper;
    }

    @Override
    public List<Intermediary> queryPage(String name, String area,String contact,String tel) {
        return intermediaryMapper.queryPage(name, area, contact, tel);
    }

    @Override
    public List<Intermediary> selectIdNameList() {
        return intermediaryMapper.selectIdNameList();
    }
}
