package com.we.fc.dept.dao;

import com.we.fc.base.BaseDao;
import com.we.fc.dept.entity.DingtalkDept;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DingtalkDeptMapper extends BaseDao<DingtalkDept>{
    List<DingtalkDept> findByParentId(Integer id);

    void updatePath(DingtalkDept t);
}